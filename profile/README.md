<p align="center">
  <a href="https://opensiro.com">
    <img src="https://raw.githubusercontent.com/opensiro/opensiro.com/main/assets/logo/opensiro-thin.svg" width="339" alt="OpenSiro">
  </a>
</p>

<p align="center">
  <strong>Open research and infrastructure for organizing, evaluating, and evolving autonomous AI systems.</strong>
</p>

<p align="center">
  OpenSiro studies how autonomous AI systems actually organize work, coordination, regulation, audit, adaptation, policy, escalation, and authority — independently of the vocabulary a project uses.
</p>

<p align="center">
  <a href="https://opensiro.com"><img alt="Website" src="https://img.shields.io/badge/Website-opensiro.com-111827?style=for-the-badge"></a>
  <a href="https://github.com/opensiro/vsm-harness-index"><img alt="VSM Harness Index" src="https://img.shields.io/badge/VSM-Harness_Index-2563eb?style=for-the-badge"></a>
  <a href="https://github.com/orgs/opensiro/discussions"><img alt="Discussions" src="https://img.shields.io/badge/Community-Discussions-7c3aed?style=for-the-badge&logo=github"></a>
  <a href="https://github.com/opensiro/vsm-oss-organization/blob/main/CONTRIBUTOR_START.md"><img alt="Contribute" src="https://img.shields.io/badge/Start-Contributing-059669?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="https://github.com/opensiro/vsm-harness-index/blob/main/METRICS.md"><img alt="Included assessments" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fopensiro%2Fvsm-harness-index%2Fmain%2Fdata%2Fmetrics.json&query=%24.corpus.included_assessments&label=assessed%20harnesses&style=flat-square"></a>
  <a href="https://github.com/opensiro/vsm-harness-index/blob/main/METRICS.md"><img alt="Catalog entries" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fopensiro%2Fvsm-harness-index%2Fmain%2Fdata%2Fmetrics.json&query=%24.corpus.catalog_entries&label=catalogued%20systems&style=flat-square"></a>
  <a href="https://github.com/opensiro/vsm-harness-index/blob/main/METRICS.md"><img alt="Reassessment events" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fopensiro%2Fvsm-harness-index%2Fmain%2Fdata%2Fmetrics.json&query=%24.corpus.reassessment_events&label=reassessments&style=flat-square"></a>
  <a href="https://github.com/opensiro/vsm-harness-profile"><img alt="Profile version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fopensiro%2Fvsm-harness-index%2Fmain%2Fdata%2Fmetrics.json&query=%24.active_contract.profile_version&label=VSM%20Profile&prefix=v&style=flat-square"></a>
  <a href="https://github.com/opensiro/vsm-harness-skills"><img alt="Methodology version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fopensiro%2Fvsm-harness-index%2Fmain%2Fdata%2Fmetrics.json&query=%24.active_contract.methodology_version&label=methodology&prefix=v&style=flat-square"></a>
</p>

<p align="center"><sub>Corpus metrics are rendered live from the Index's generated <code>data/metrics.json</code>; this profile does not maintain a second copy of the numbers.</sub></p>

---

## What OpenSiro does

Agent systems are increasingly organizational systems: multiple actors perform operations, coordinate around shared constraints, regulate current work, inspect one another, adapt to the environment, and make policy decisions.

OpenSiro builds public research infrastructure for making those structures explicit and comparable. The goal is not to force projects to use one vocabulary. The goal is to map where responsibilities and decision rights actually live, and to keep the evidence behind those claims inspectable.

## Public research tracks

| Track | What it studies | Start here |
| --- | --- | --- |
| **VSM Harness** | The organization of agent harnesses through implementation-independent VSM functions and evidence-backed repository assessments. | [VSM Harness Index](https://github.com/opensiro/vsm-harness-index) |
| **ARCTIC** | Whether frontier systems can transfer capabilities into compact student models under sample-blind evaluation. | [ARCTIC-0](https://github.com/opensiro/arctic-0) |

These tracks are separate. VSM semantics come from the VSM Harness Profile; ARCTIC has its own research artifacts and roadmap.

## VSM Harness ecosystem

```text
Beer / cybernetics
        ↓
VSM Harness Profile
        ↓
assessment procedure / skills
        ↓
VSM Harness Index
        ↓
curated downstream views
```

A core rule across this work is:

> **Map the organizational function first; classify autonomy second.**

Names such as *manager*, *verifier*, *planner*, *delegation*, or *learning* are not treated as evidence of a VSM function by themselves.

## Core repositories

| Repository | Role |
| --- | --- |
| **[vsm-harness-profile](https://github.com/opensiro/vsm-harness-profile)** | Authoritative, implementation-independent VSM semantics for the ecosystem. |
| **[vsm-harness-skills](https://github.com/opensiro/vsm-harness-skills)** | Reusable assessment procedures and tooling that apply the Profile without redefining it. |
| **[vsm-harness-index](https://github.com/opensiro/vsm-harness-index)** | Evidence-backed corpus of repository-relative harness assessments and deterministic derived views. |
| **[awesome-vsm-harness](https://github.com/opensiro/awesome-vsm-harness)** | Curated representative organizational forms selected from the broader corpus. |
| **[vsm-oss-organization](https://github.com/opensiro/vsm-oss-organization)** | Experimental organizational/control construction for the bounded OpenSiro VSM Harness OSS group. |
| **[terminal-bench-vsm](https://github.com/opensiro/terminal-bench-vsm)** | Executable research on failure-aware coding harnesses and their evaluation/growth environment. |
| **[arctic-0](https://github.com/opensiro/arctic-0)** | Public ARCTIC-0 archive, schemas, taxonomy, authoring tools, and analysis. |
| **[opensiro.com](https://github.com/opensiro/opensiro.com)** | Presentation layer for public orientation and visual explanations. |

## New here?

Start with **[opensiro.com](https://opensiro.com)** for the plain-language and visual orientation layer. The **[VSMLite / VSM poster](https://opensiro.com/vsm.html)** introduces the normalization problem, organizational functions, and control relationships.

Then choose the artifact closest to your goal:

- **Inspect real harness assessments:** [VSM Harness Index](https://github.com/opensiro/vsm-harness-index)
- **Understand the canonical semantics:** [VSM Harness Profile](https://github.com/opensiro/vsm-harness-profile)
- **Run the assessment procedure:** [VSM Harness Skills](https://github.com/opensiro/vsm-harness-skills)
- **Contribute to the bounded OSS organization:** [Contributor Start](https://github.com/opensiro/vsm-oss-organization/blob/main/CONTRIBUTOR_START.md)
- **Explore capability-transfer research:** [ARCTIC-0](https://github.com/opensiro/arctic-0)

## Source-of-truth boundaries

The website and this organization profile are presentation layers. Canonical claims stay with the repositories that own them:

- **Profile** → VSM semantics
- **Skills** → assessment procedure
- **Index** → assessments, rankings, corpus metrics, and provenance
- **ARCTIC-0** → released ARCTIC artifacts

This separation keeps definitions, evidence, derived views, experiments, and presentation synchronized without turning the organization profile into another database.

## Community

Use **[OpenSiro Discussions](https://github.com/orgs/opensiro/discussions)** for cross-repository questions, ideas, and early-stage proposals. Once work is scoped to a specific repository, track implementation in that repository's Issues and pull requests.
