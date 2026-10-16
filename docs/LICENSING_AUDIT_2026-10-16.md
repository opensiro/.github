# OpenSiro public-repository licensing inventory

**Snapshot: 2026-10-16.** This inventory includes **public repositories only**, as returned by GitHub's public-only organization search (`org:opensiro is:public`). Repository visibility can change; check again before any future update. GitHub-organization membership is not equivalent to membership in the bounded VSM OSS control plane.

## Existing licenses — preserve

| Public repository | Original-material licensing | Action |
| --- | --- | --- |
| [arctic-0](https://github.com/opensiro/arctic-0) | MIT for code; CC BY 4.0 for original `dataset/` | Keep separate code/data grants |
| [vsm-oss-organization](https://github.com/opensiro/vsm-oss-organization) | Apache-2.0 | Keep |
| [vsm-harness-profile](https://github.com/opensiro/vsm-harness-profile) | CC BY 4.0 for normative original material; Apache-2.0 for maintenance software; CC BY-NC-ND 4.0 bundled article; third-party literature excluded | Keep distinctions |
| [awesome-vsm-harness](https://github.com/opensiro/awesome-vsm-harness) | CC0 1.0 | Keep |
| [vsm-harness-skills](https://github.com/opensiro/vsm-harness-skills) | Apache-2.0, with separately CC BY 4.0 Profile snapshot | Keep |
| [vsm-harness-index](https://github.com/opensiro/vsm-harness-index) | Apache-2.0 for original code/docs; CC BY-SA 4.0 retained for adapted discovery material and specified generated views under `SOURCES.md` | Keep attribution |
| [terminal-bench-vsm](https://github.com/opensiro/terminal-bench-vsm) | Apache-2.0 | Keep |
| [opensiro.com](https://github.com/opensiro/opensiro.com) | MIT for original website source; brand and mascots excluded, fonts/OFL and dataset-specific grants retained | Keep `BRAND.md` and historical notices |
| [vsm-harness-capability](https://github.com/opensiro/vsm-harness-capability) | Apache-2.0 for original code/docs | Keep |
| [cognee-community](https://github.com/opensiro/cognee-community) | Upstream-derived Apache-2.0 grant | Retain source attribution and upstream rights |

## Public repositories with proposed clarifications

| Public repository | Proposed coverage | PR | Gate |
| --- | --- | --- | --- |
| [.github](https://github.com/opensiro/.github) | CC BY 4.0 for original profile prose; MIT for original scripts/workflows; trademarks/graphics/third-party data excluded | [#17](https://github.com/opensiro/.github/pull/17) | Confirm authors' licensing authority and exclusions |
| [upstream](https://github.com/opensiro/upstream) | CC BY 4.0 for original portfolio prose; CC0 for original machine-readable registry data, preserving upstream code and trademarks | [#1](https://github.com/opensiro/upstream/pull/1) | Confirm rights-holder consent, including irrevocable CC0 dedication |

Both are **draft PRs**; neither grant is represented as merged or final. No modification to previously established licenses is proposed in other public repositories.

## Scope, provenance and validation

- This snapshot does not enumerate or license private repositories. Discover their existence or contents only under a separate explicit task.
- Permissions to publish OpenSiro's original code, documentation, datasets and brand are distinct from licenses of software that OpenSiro *assesses*. The latter is addressed separately by [Index #1605](https://github.com/opensiro/vsm-harness-index/issues/1605).
- A root license cannot relicense third-party software, externally authored research content, fonts, media, or model weights. Preserve previous rights and trademarks.
- Before merging either draft, maintainers/rightsholders must verify historical contribution ownership and terms. CI success and repository access are not legal attestations.
- `upstream` is a public **portfolio and registry**, not a fork monorepo. Its CC0 proposal affects only authorized original registry material and does not change the conditions of linked upstream projects.

This document is a dated audit snapshot, not a new automated license authority, scheduler, policy gate, or VSM system boundary.
