export const TRACKED = [
  ['vsm-harness-profile', 'profile', 'bounded'],
  ['vsm-harness-skills', 'skills', 'bounded'],
  ['vsm-harness-index', 'index', 'bounded'],
  ['awesome-vsm-harness', 'awesome', 'bounded'],
  ['vsm-oss-organization', 'organization', 'bounded'],
  ['vsm-harness-capability', 'capability', 'adjacent'],
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

const month = (date) => date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();

const formatPeriod = (start, end, days) => {
  if (!start || !end) return `${days ?? 10} COMPLETED DAYS`;
  const a = new Date(`${start}T00:00:00Z`);
  const b = new Date(`${end}T00:00:00Z`);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return `${days ?? 10} COMPLETED DAYS`;
  const range = a.getUTCMonth() === b.getUTCMonth()
    ? `${month(a)} ${a.getUTCDate()}-${b.getUTCDate()}`
    : `${month(a)} ${a.getUTCDate()}-${month(b)} ${b.getUTCDate()}`;
  return `${range} · ${days ?? 10} COMPLETED DAYS`;
};

export function buildSvg(data) {
  const rows = TRACKED.map(([repo, label, scope]) => ({
    repo,
    label,
    scope,
    commits: data.repos?.[repo]?.commits ?? 0,
    prs: data.repos?.[repo]?.prs ?? 0,
    issues: data.repos?.[repo]?.issues ?? 0,
  }));

  const observedMax = Math.max(1, ...rows.flatMap(r => [r.commits, r.prs, r.issues]));
  const maxPower = Math.max(1, Math.ceil(Math.log10(observedMax)));
  const plotTop = 62;
  const baseline = 158;
  const plotHeight = baseline - plotTop;
  const left = 74;
  const right = 870;
  const step = (right - left) / rows.length;

  const logY = (value) => {
    if (value <= 1) return baseline;
    return baseline - (Math.log10(value) / maxPower) * plotHeight;
  };

  const majorTicks = Array.from({ length: maxPower + 1 }, (_, power) => 10 ** power);
  const minorTicks = [];
  const midpointTicks = [];
  for (let power = 0; power < maxPower; power += 1) {
    const decade = 10 ** power;
    for (const factor of [2, 5]) {
      const value = factor * decade;
      if (value <= 10 ** maxPower) minorTicks.push({ value, factor });
    }
    midpointTicks.push(Math.sqrt(10) * decade);
  }

  const yAxis = majorTicks.map((value) => {
    const y = logY(value);
    return `<line x1="${left}" y1="${y.toFixed(1)}" x2="${right}" y2="${y.toFixed(1)}" class="grid" />
      <text x="${left - 10}" y="${(y + 3).toFixed(1)}" text-anchor="end" class="axis-label">${value}</text>`;
  }).join('');

  const trackTicks = (cx) => [
    ...minorTicks.map(({ value, factor }) => {
      const y = logY(value);
      const half = factor === 5 ? 3 : 2.5;
      return `<line x1="${(cx - half).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(cx + half).toFixed(1)}" y2="${y.toFixed(1)}" class="track-tick minor factor-${factor}" />`;
    }),
    ...midpointTicks.map((value) => {
      const y = logY(value);
      return `<line x1="${(cx - 3.5).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(cx + 3.5).toFixed(1)}" y2="${y.toFixed(1)}" class="track-tick midpoint" />`;
    }),
    ...majorTicks.map((value) => {
      const y = logY(value);
      return `<line x1="${(cx - 4.5).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(cx + 4.5).toFixed(1)}" y2="${y.toFixed(1)}" class="track-tick major" />`;
    }),
  ].join('');

  const barWidth = { commits: 28, prs: 20, issues: 12 };
  const series = ['commits', 'prs', 'issues'];

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
      const gap = 5;
      keys.forEach((key, index) => {
        tieOffset[key] = (index - (keys.length - 1) / 2) * gap;
      });
    }

    const bars = [...series]
      .sort((a, b) => row[b] - row[a])
      .map((key) => {
        const value = row[key];
        if (value <= 0) return '';
        const y = logY(value);
        const h = Math.max(3, baseline - y);
        const w = barWidth[key];
        const x = cx - w / 2 + (tieOffset[key] ?? 0);
        return `<rect class="bar ${key}" x="${x.toFixed(1)}" y="${(baseline - h).toFixed(1)}" width="${w}" height="${h.toFixed(1)}" rx="1" />`;
      }).join('');

    const values = series
      .filter(k => row[k] > 0)
      .map(k => `${row[k]} ${k === 'prs' ? 'PRs' : k}`)
      .join(' · ');

    const scopeLabel = row.scope === 'adjacent'
      ? `<text x="${cx.toFixed(1)}" y="190" text-anchor="middle" class="scope-label">adjacent</text>`
      : '';

    return `
      <g class="repo" aria-label="${esc(row.repo)}: ${esc(values)}${row.scope === 'adjacent' ? '; adjacent research repository' : ''}">
        <line x1="${cx.toFixed(1)}" y1="${plotTop}" x2="${cx.toFixed(1)}" y2="${baseline}" class="track" />
        ${bars}
        ${trackTicks(cx)}
        <text x="${cx.toFixed(1)}" y="178" text-anchor="middle" class="repo-label">${esc(row.label)}</text>
        ${scopeLabel}
      </g>`;
  }).join('');

  const adjacentIndex = rows.findIndex(row => row.scope === 'adjacent');
  const boundary = adjacentIndex > 0
    ? (() => {
        const x = left + step * adjacentIndex;
        return `<line x1="${x.toFixed(1)}" y1="${plotTop - 2}" x2="${x.toFixed(1)}" y2="192" class="scope-boundary" />`;
      })()
    : '';

  const range = data.window?.start && data.window?.end
    ? `${data.window.start} - ${data.window.end}`
    : '10 completed days';
  const periodLabel = formatPeriod(data.window?.start, data.window?.end, data.window?.days);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="200" viewBox="0 0 900 200" role="img" aria-labelledby="title desc">
  <title id="title">OpenSiro VSM Harness repository activity</title>
  <desc id="desc">GitHub activity for the five repositories in the bounded OpenSiro VSM OSS organization plus the adjacent experimental VSM Harness Capability repository for ${esc(range)}. The vertical axis is logarithmic: powers of ten are equally spaced, with per-repository track ticks at 2x and 5x subdivisions plus the geometric midpoint of each decade for visual estimation. Opaque overlapping bars show commit, pull request, and issue activity. Equal values are separated horizontally rather than merged.</desc>
  <style>
    text { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; fill: #18181b; }
    .frame { fill: #ffffff; stroke: #d0d7de; }
    .track { stroke: #d8dee4; stroke-width: 1; stroke-dasharray: 2 4; }
    .track-tick { stroke: #000000; stroke-width: 0.8; stroke-linecap: round; shape-rendering: crispEdges; pointer-events: none; }
    .track-tick.midpoint { stroke-width: 0.9; }
    .track-tick.major { stroke-width: 1; }
    .grid { stroke: #d8dee4; stroke-width: 1; stroke-dasharray: 4 5; }
    .axis { stroke: #57606a; stroke-width: 1; }
    .axis-label { font-size: 8px; fill: #6e7781; }
    .bar { stroke: #ffffff; stroke-width: 1; shape-rendering: crispEdges; }
    .commits { fill: ${COLORS.commits}; }
    .prs { fill: ${COLORS.prs}; }
    .issues { fill: ${COLORS.issues}; }
    .repo-label { font-size: 10px; font-weight: 700; }
    .scope-label { font-size: 7px; fill: #8c959f; letter-spacing: 0.4px; }
    .scope-boundary { stroke: #8c959f; stroke-width: 1; stroke-dasharray: 3 4; }
    .muted { fill: #6e7781; }
    .legend-label { font-size: 9px; }
  </style>
  <rect x="0.5" y="0.5" width="899" height="199" rx="14" class="frame" />
  <text x="30" y="34" font-size="12" font-weight="700" letter-spacing="1.4">OPENSIRO / VSM HARNESS ACTIVITY</text>
  <text x="870" y="34" text-anchor="end" font-size="9" class="muted" letter-spacing="0.7">${esc(periodLabel)}</text>

  <g aria-hidden="true">
    <circle cx="30" cy="52" r="4" fill="${COLORS.commits}"/><text x="40" y="55" class="legend-label muted">commits</text>
    <circle cx="100" cy="52" r="4" fill="${COLORS.prs}"/><text x="110" y="55" class="legend-label muted">PRs</text>
    <circle cx="150" cy="52" r="4" fill="${COLORS.issues}"/><text x="160" y="55" class="legend-label muted">issues</text>
    <text x="215" y="55" class="legend-label muted">log10 y</text>
  </g>

  ${yAxis}
  <line x1="${left}" y1="${plotTop}" x2="${left}" y2="${baseline}" class="axis" />
  <line x1="${left}" y1="${baseline}" x2="${right}" y2="${baseline}" class="axis" />
  ${boundary}
  ${groups}
</svg>`;
}
