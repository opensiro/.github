# opensiro

Open research and infrastructure for organizing, evaluating, and evolving autonomous AI systems.

OpenSiro studies AI agent harnesses as organizations: how operational work, coordination, regulation, independent audit, adaptation, policy, escalation, and authority are actually implemented — independently of the vocabulary a project uses. A separate research track, ARCTIC, studies whether frontier systems can transfer capabilities into compact models under sample-blind evaluation.

## New here?

Start with **[opensiro.com](https://opensiro.com)** for the plain-language and visual orientation layer. The site explains why this work exists and includes the **[VSMLite / VSM poster](https://opensiro.com/vsm.html)** for the normalization problem, organizational functions, and control relationships.

The website is a presentation layer, not a normative source of truth. Canonical VSM semantics, assessment procedure, evidence-backed assessments, and contributor authority remain in the repositories that own them.

## VSM Harness ecosystem

The VSM Harness repositories form an evidence-backed stack for describing and comparing agent harness organization:

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

- **[VSM Harness Profile](https://github.com/opensiro/vsm-harness-profile)** — authoritative, implementation-independent VSM semantics for the ecosystem.
- **[VSM Harness Skills](https://github.com/opensiro/vsm-harness-skills)** — reusable assessment procedures and tooling that apply the Profile without redefining it.
- **[VSM Harness Index](https://github.com/opensiro/vsm-harness-index)** — evidence-backed corpus of repository-relative harness assessments and deterministic derived views.
- **[Awesome VSM Harness](https://github.com/opensiro/awesome-vsm-harness)** — curated representative organizational forms selected from the broader corpus.
- **[VSM OSS Organization](https://github.com/opensiro/vsm-oss-organization)** — an experimental organizational/control construction for the bounded OpenSiro VSM Harness OSS group.

A core rule across this work is: **map the organizational function first; classify autonomy second.** Names such as *manager*, *verifier*, *planner*, *delegation*, or *learning* are not treated as evidence of a VSM function by themselves.

## Executable research

**[terminal-bench-vsm](https://github.com/opensiro/terminal-bench-vsm)** explores a failure-aware coding harness together with a separate evaluation/growth environment. It is an executable research artifact; normative VSM semantics still come from the VSM Harness Profile.

## ARCTIC

**[ARCTIC-0](https://github.com/opensiro/arctic-0)** is a sample-blind benchmark research track for evaluating whether frontier AI systems can autonomously transfer capabilities into compact student models that generalize to unseen tasks.

The current public repository is the ARCTIC-0 archive and tooling release: task archive, schemas, taxonomy, authoring tools, and analysis. Evaluator/runtime/leaderboard components are separate roadmap work and are not presented as released infrastructure.

## Community

Use **[OpenSiro Discussions](https://github.com/orgs/opensiro/discussions)** for cross-repository questions, ideas, and early-stage proposals. Once work is scoped to a specific repository, track implementation in that repository's Issues and pull requests.

## Start here

| Goal | Destination |
| --- | --- |
| Understand the idea in plain language and visually | [opensiro.com](https://opensiro.com) · [VSMLite / VSM poster](https://opensiro.com/vsm.html) |
| Contribute to the bounded VSM Harness OSS system | [Contributor Start](https://github.com/opensiro/vsm-oss-organization/blob/main/CONTRIBUTOR_START.md) |
| Understand the canonical VSM semantics | [vsm-harness-profile](https://github.com/opensiro/vsm-harness-profile) |
| Inspect assessed agent harnesses | [vsm-harness-index](https://github.com/opensiro/vsm-harness-index) |
| Apply the assessment procedure | [vsm-harness-skills](https://github.com/opensiro/vsm-harness-skills) |
| Study the OSS organization experiment | [vsm-oss-organization](https://github.com/opensiro/vsm-oss-organization) |
| Explore capability-transfer research | [arctic-0](https://github.com/opensiro/arctic-0) |

OpenSiro repositories keep normative definitions, evidence-backed assessments, executable experiments, organizational authority, and presentation layers separate so that each claim can be traced to its actual source of truth.
