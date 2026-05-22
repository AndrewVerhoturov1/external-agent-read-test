# External Task Handoff: EXT-0001

## Task Identity

- `external_task_id`: `EXT-0001`
- `external_attempt_id`: `EXT-0001`
- `task_type`: `external-package-review`

## Goal

Проверить, достаточно ли текущего published public context repo для дальнейшей bounded external работы.

Нужен не code review и не repo-authority verdict, а внешний review published context как onboarding surface.

## Required Static Anchors

- [EA-READ-FIRST]
- [EA-REQUIRED-READING-ORDER]
- [EA-CORE-BOUNDARY]
- [EA-TRUTH-RULE]
- [EA-TASK-BUNDLE]
- [EA-GITHUB-LINKS]
- [EA-OUTPUT-WORKFLOW-CRITIQUE]

## Context

Проект:

- browser-based authoring tool / editor / tabletop sandbox для 2D counter-based варгеймов
- Sword of Rome-like модуль здесь = первый тестовый модуль, а не весь смысл проекта

Нас интересует внешний взгляд на published public context:

- понимается ли framing проекта;
- достаточно ли public docs для дальнейшей bounded external работы;
- есть ли stale or misleading signals;
- каких public файлов или индексов ещё не хватает.

## Published Public Context To Read

Primary repo:

- GitHub repo: `https://github.com/AndrewVerhoturov1/Sword_of_rome_2d`

Read these raw URLs first:

- `https://raw.githubusercontent.com/AndrewVerhoturov1/Sword_of_rome_2d/main/README.md`
- `https://raw.githubusercontent.com/AndrewVerhoturov1/Sword_of_rome_2d/main/AGENTS.md`
- `https://raw.githubusercontent.com/AndrewVerhoturov1/Sword_of_rome_2d/main/.ai/repo_navigation.md`
- `https://raw.githubusercontent.com/AndrewVerhoturov1/Sword_of_rome_2d/main/.ai/project_state.md`
- `https://raw.githubusercontent.com/AndrewVerhoturov1/Sword_of_rome_2d/main/.ai/project_brief.md`
- `https://raw.githubusercontent.com/AndrewVerhoturov1/Sword_of_rome_2d/main/.ai/architecture.md`
- `https://raw.githubusercontent.com/AndrewVerhoturov1/Sword_of_rome_2d/main/.ai/decisions.md`
- `https://raw.githubusercontent.com/AndrewVerhoturov1/Sword_of_rome_2d/main/canon/context/sword_of_rome_web_project_context.md`

Important local review note:

- `repo_navigation.md` уже обновлён локально и теперь говорит, что repo опубликован на GitHub.
- `project_state.md` локально ещё держит pre-publication wording.
- Если published raw files и handoff note расходятся, укажи это как mismatch risk, а не как repo truth.

## What To Evaluate

1. Достаточно ли current published public context для дальнейшей bounded external работы без локального доступа к repo.
2. Какие документы лучше всего объясняют:
   - что это за проект;
   - зачем здесь Sword of Rome-like модуль;
   - где public/local-only boundary.
3. Есть ли stale, contradictory or misleading signals.
4. Какие минимальные additions or fixes дали бы наибольший эффект для внешнего онбординга.

## Hard Boundaries

- Не утверждай, что ты видел локальный repo, shell, git status, git diff, tests или runtime.
- Не делай claims о файлах вне published links above.
- Не подменяй внешний review локальной verification.
- Если чего-то не хватает, пиши `not available in provided context`.

## Expected Output

Use this exact structure:

```md
## Static Check

STATIC_MANUAL_USED:
Static manual version:
Applied static anchors:
Missing required anchors:

## Provider/Model

[provider / model or not available]

## Source request

EXT-0001

## Recording mode

response-only

## Recorder limitations

- External response is not repository truth.
- No local repo access.
- No claims about tests, git status, git diff or runtime verification.

## Verdict

ready / ready-with-warnings / blocked

## Summary

## Role Boundary Review

## Token Economy Review

## Findings

| Severity | Finding | Evidence from provided context | Suggested fix |
|---|---|---|---|

## Minimal Change Set

## Risks Introduced By Suggested Changes

## Questions for Master / Lead Orchestrator

## Out of Scope

## Recorder Payload
```

## Recorder Payload Contract

In `## Recorder Payload`, fill these fields:

- `external_task_id: EXT-0001`
- `external_attempt_id: EXT-0001`
- `response_path: .ai/external_chats/responses/2026-05-23_r1_public_context_smoke_response.md`
- `published_links`
- `recording_mode: response-only`
- `allowed_writes`
- `raw_response`

Rules:

- `raw_response` must contain full main answer verbatim.
- `raw_response` must not include section `## Recorder Payload`.
- If you cannot provide full payload, return `blocked` instead of partial degradation.
