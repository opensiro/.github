export const TRACKED = [
  ['vsm-harness-profile', 'profile'],
  ['vsm-harness-skills', 'skills'],
  ['vsm-harness-index', 'index'],
  ['awesome-vsm-harness', 'awesome'],
  ['vsm-oss-organization', 'organization'],
];

const COLORS = {
  commits: '#2f81f7',
  prs: '#2da44e',
  issues: '#bf8700',
};

const esc = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function niceScale(maxValue) {
  if (maxValue <= 0) return { max: 10, ticks: [0, 5, 10] };
  const targetStep = maxValue / 4;
  const magnitude = 10 ** Math.floor(Math.log10(targetStep));
  const normalized = targetStep / magnitude;
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  const step = factor * magnitude;
  const max = Math.ceil(maxValue / step) * step;
  const ticks = [];
  for (let value = 0; value <= max + step / 2; value += step) ticks.push(value);
  return { max, ticks };
}

export function buildSvg(data) {
  const rows = TRACKED.map(([repo, label]) => ({
    repo,
    label,
    commits: data.repos?.[repo]?.commits ?? 0,
    prs: data.repos?.[repo]?.prs ?? 0,
    issues: data.repos?.[repo]?.issues ?? 0,
  }));

  const rawMax = Math.max(0, ...rows.flatMap(r => [r.commits, r.prs, r.issues]));
  const scale = niceScale(rawMax);
  const plotTop = 68;
  const baseline = 158;
  const plotHeight = baseline - plotTop;
  const axisX = 48;
  const left = 68;
  const right = 870;
  const step = (right - left) / rows.length;

  const barWidth = { commits: 32, prs: 23, issues: 14 };
  const series = ['commits', 'prs', 'issues'];

  const yFor = (value) => baseline - (value / scale.max) * plotHeight;

  const grid = scale.ticks.map((tick) => {
    const y = yFor(tick);
    return `
      <line x1="${axisX}" y1="${y.toFixed(1)}" x2="${right}" y2="${y.toFixed(1)}" class="grid" />
      <text x="${axisX - 7}" y="${(y + 3).toFixed(1)}" text-anchor="end" class="axis-label">${tick}</text>`;
  }).join('');

  const groups = rows.map((row, i) => {
    const cx = left + step * (i + 0.5);
    const byValue = new Map();
    for (const key of series) {
      const v = row[key];
      if (!byValue.has(v)) byValue.set(v, []);
      byValue.get(v).push(key);
    }

    const tieOffset = {};
    for (const [value, keys] of byValue.entries()) {
      if (value <= 0 || keys.length === 1) continue;
      const gap = 8;
      keys.forEach((key, index) => {
        tieOffset[key] = (index - (keys.length - 1) / 2) * gap;
      });
    }

    const bars = [...series]
      .sort((a, b) => row[b] - row[a])
      .map((key) => {
        const value = row[key];
        if (value <= 0) return '';
        const y = yFor(value);
        const h = Math.max(3, baseline - y);
        const w = barWidth[key];
        const x = cx - w / 2 + (tieOffset[key] ?? 0);
        return `<rect class="bar ${key}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w}" height="${h.toFixed(1)}" rx="1" />`;
      }).join('');

    const values = series
      .filter(k => row[k] > 0)
      .map(k => `${row[k]} ${k === 'prs' ? 'PRs' : k}`)
      .join(' · ');

    return `
      <g class="repo" aria-label="${esc(row.repo)}: ${esc(values)}">
        <line x1="${cx.toFixed(1)}" y1="${plotTop}" x2="${cx.toFixed(1)}" y2="${baseline}" class="track" />
        ${bars}
        <text x="${cx.toFixed(1)}" y="178" text-anchor="middle" class="repo-label">${esc(row.label)}</text>
      </g>`;
  }).join('');

  const range = data.window?.start && data.window?.end
    ? `${data.window.start} - ${data.window.end}`
    : '10 completed days';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="200" viewBox="0 0 900 200" role="img" aria-labelledby="title desc">
  <title id="title">OpenSiro VSM OSS repository activity</title>
  <desc id="desc">Activity in the five repositories of the bounded OpenSiro VSM OSS organization for ${esc(range)}. Opaque overlapping bars show commit, pull request, and issue contributions. Equal values are separated horizontally rather than merged.</desc>
  <style>
    text { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; fill: #18181b; }
    .frame { fill: #ffffff; stroke: #d0d7de; }
    .track { stroke: #d8dee4; stroke-width: 1; stroke-dasharray: 2 4; }
    .grid { stroke: #d8dee4; stroke-width: 1; stroke-dasharray: 4 5; }
    .axis { stroke: #57606a; stroke-width: 1; }
    .axis-label { font-size: 8px; fill: #6e7781; }
    .bar { stroke: #ffffff; stroke-width: 1; shape-rendering: crispEdges; }
    .commits { fill: ${COLORS.commits}; }
    .prs { fill: ${COLORS.prs}; }
    .issues { fill: ${COLORS.issues}; }
    .repo-label { font-size: 10px; font-weight: 700; }
    .muted { fill: #6e7781; }
    .legend-label { font-size: 9px; }
  </style>
  <rect x="0.5" y="0.5" width="899" height="199" rx="14" class="frame" />
  <text x="30" y="34" font-size="12" font-weight="700" letter-spacing="1.4">OPENSIRO / REPOSITORY ACTIVITY</text>
  <text x="870" y="34" text-anchor="end" font-size="10" class="muted" letter-spacing="0.8">VSM OSS · 10D</text>

  <g aria-hidden="true">
    <circle cx="30" cy="52" r="4" fill="${COLORS.commits}"/><text x="40" y="55" class="legend-label muted">commits</text>
    <circle cx="100" cy="52" r="4" fill="${COLORS.prs}"/><text x="110" y="55" class="legend-label muted">PRs</text>
    <circle cx="150" cy="52" r="4" fill="${COLORS.issues}"/><text x="160" y="55" class="legend-label muted">issues</text>
  </g>

  ${grid}
  <line x1="${axisX}" y1="${plotTop}" x2="${axisX}" y2="${baseline}" class="axis" />
  ${groups}
  <text x="870" y="190" text-anchor="end" font-size="8" class="muted">through ${esc(data.as_of ?? 'n/a')}</text>
</svg>`;
}
