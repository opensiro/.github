#!/usr/bin/env python3
import json
import os
import urllib.request
from datetime import datetime, time, timedelta, timezone
from pathlib import Path

USERNAME = "xLagerFeuer"
ORG = "opensiro"
WINDOW_DAYS = 10
TRACKED = [
    "vsm-harness-profile",
    "vsm-harness-skills",
    "vsm-harness-index",
    "awesome-vsm-harness",
    "vsm-oss-organization",
]
OUT = Path("assets/repo-activity/data.json")

QUERY = r'''
query($user: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $user) {
    contributionsCollection(from: $from, to: $to) {
      commitContributionsByRepository(maxRepositories: 100) {
        repository { name nameWithOwner isPrivate }
        contributions(first: 1) { totalCount }
      }
      pullRequestContributionsByRepository(maxRepositories: 100) {
        repository { name nameWithOwner isPrivate }
        contributions(first: 1) { totalCount }
      }
      issueContributionsByRepository(maxRepositories: 100) {
        repository { name nameWithOwner isPrivate }
        contributions(first: 1) { totalCount }
      }
    }
  }
}
'''


def graphql(query, variables):
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        raise RuntimeError("GITHUB_TOKEN is required")
    payload = json.dumps({"query": query, "variables": variables}).encode()
    req = urllib.request.Request(
        "https://api.github.com/graphql",
        data=payload,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "User-Agent": "opensiro-org-repo-activity",
        },
        method="POST",
    )
    with urllib.request.urlopen(req) as response:
        body = json.load(response)
    if body.get("errors"):
        raise RuntimeError(json.dumps(body["errors"], indent=2))
    return body["data"]


def main():
    last_complete = datetime.now(timezone.utc).date() - timedelta(days=1)
    start = last_complete - timedelta(days=WINDOW_DAYS - 1)
    from_dt = datetime.combine(start, time.min, tzinfo=timezone.utc)
    to_dt = datetime.combine(last_complete, time.max, tzinfo=timezone.utc)

    data = graphql(QUERY, {
        "user": USERNAME,
        "from": from_dt.isoformat().replace("+00:00", "Z"),
        "to": to_dt.isoformat().replace("+00:00", "Z"),
    })
    user = data.get("user")
    if not user:
        raise RuntimeError(f"GitHub user not found: {USERNAME}")
    c = user["contributionsCollection"]

    repos = {name: {"commits": 0, "prs": 0, "issues": 0} for name in TRACKED}
    mapping = {
        "commitContributionsByRepository": "commits",
        "pullRequestContributionsByRepository": "prs",
        "issueContributionsByRepository": "issues",
    }
    for source, target in mapping.items():
        for item in c.get(source, []):
            repo = item.get("repository") or {}
            if repo.get("isPrivate"):
                continue
            full = repo.get("nameWithOwner") or ""
            name = repo.get("name") or ""
            if not full.startswith(f"{ORG}/") or name not in repos:
                continue
            repos[name][target] = int((item.get("contributions") or {}).get("totalCount") or 0)

    payload = {
        "schema_version": 1,
        "scope": "vsm-oss-bounded-system",
        "source_user": USERNAME,
        "window": {"days": WINDOW_DAYS, "start": start.isoformat(), "end": last_complete.isoformat()},
        "as_of": last_complete.isoformat(),
        "repos": repos,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, indent=2))

if __name__ == "__main__":
    main()
