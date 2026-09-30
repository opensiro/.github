#!/usr/bin/env python3
import json
import os
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

USERNAME = "xLagerFeuer"
ORG = "opensiro"
WINDOW_DAYS = 10
BOUNDED = [
    "vsm-harness-profile",
    "vsm-harness-skills",
    "vsm-harness-index",
    "awesome-vsm-harness",
    "vsm-oss-organization",
]
ADJACENT = [
    "vsm-harness-capability",
]
PRIVATE = [
    "vsm-harness-research",
]
TRACKED = [*BOUNDED, *ADJACENT, *PRIVATE]
OUT = Path("assets/repo-activity/data.json")


def request_json(url, *, private=False):
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "opensiro-org-repo-activity",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if private:
        token = os.environ.get("OPENSIRO_ACTIVITY_TOKEN")
        if not token:
            raise RuntimeError(
                "OPENSIRO_ACTIVITY_TOKEN is required to refresh private repository activity"
            )
    else:
        token = os.environ.get("OPENSIRO_ACTIVITY_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        return json.load(response)


def authored_commit_count(repo, start, end):
    total = 0
    page = 1
    is_private = repo in PRIVATE
    while True:
        params = urllib.parse.urlencode({
            "author": USERNAME,
            "since": f"{start.isoformat()}T00:00:00Z",
            "until": f"{end.isoformat()}T23:59:59Z",
            "per_page": 100,
            "page": page,
        })
        items = request_json(
            f"https://api.github.com/repos/{ORG}/{repo}/commits?{params}",
            private=is_private,
        )
        total += len(items)
        if len(items) < 100:
            return total
        page += 1


def authored_issue_count(repo, kind, start, end):
    query = (
        f"repo:{ORG}/{repo} author:{USERNAME} is:{kind} "
        f"created:{start.isoformat()}..{end.isoformat()}"
    )
    params = urllib.parse.urlencode({"q": query, "per_page": 1})
    return int(request_json(
        f"https://api.github.com/search/issues?{params}",
        private=repo in PRIVATE,
    )["total_count"])


def main():
    last_complete = datetime.now(timezone.utc).date() - timedelta(days=1)
    start = last_complete - timedelta(days=WINDOW_DAYS - 1)

    repos = {}
    for repo in TRACKED:
        repos[repo] = {
            "commits": authored_commit_count(repo, start, last_complete),
            "prs": authored_issue_count(repo, "pr", start, last_complete),
            "issues": authored_issue_count(repo, "issue", start, last_complete),
        }

    payload = {
        "schema_version": 3,
        "scope": "vsm-harness-activity",
        "bounded_scope_repos": BOUNDED,
        "adjacent_repos": ADJACENT,
        "private_repos": PRIVATE,
        "source_user": USERNAME,
        "metric_semantics": {
            "commits": "authored commits visible in repository commit history",
            "prs": "authored pull requests created in the window",
            "issues": "authored issues created in the window",
        },
        "window": {
            "days": WINDOW_DAYS,
            "start": start.isoformat(),
            "end": last_complete.isoformat(),
        },
        "as_of": last_complete.isoformat(),
        "repos": repos,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, indent=2))


if __name__ == "__main__":
    main()
