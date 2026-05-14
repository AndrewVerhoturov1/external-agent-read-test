# External Task Bundle: PILOT-002-R2 workflow critique

## Bundle status

request_prepared

## Agent kind

External Web Chat

## External provider

Any

## External mode

text-chat

## Task profile

workflow-critique

## Goal

Выполнить bounded workflow critique короткой заметки про published-artifact contract и recorder flow. Нужен содержательный внешний ответ, который выявляет риски формулировок и предлагает минимальные улучшения, но не делает утверждений о локальном репозитории как о факте.

## Source constraints

- У тебя нет repo authority.
- Не заявляй, что ты видел локальные файлы, git status, git diff или результаты тестов.
- Не трактуй внешний ответ как факт о repo.
- Не придумывай дополнительные workflow-слои, migration-steps, тесты, commits или repo-детали, которых нет в published context.
- Если информации не хватает, пиши `not available in provided context`.

## Required static anchors

- [EA-READ-FIRST]
- [EA-REQUIRED-READING-ORDER]
- [EA-STATIC-READBACK]
- [EA-CORE-BOUNDARY]
- [EA-TRUTH-RULE]
- [EA-TASK-BUNDLE]
- [EA-GITHUB-LINKS]
- [EA-OUTPUT-WORKFLOW-CRITIQUE]

## Task instructions

1. Сначала прочитай static manual по raw URL.
2. Выполни обязательный static readback.
3. Затем прочитай этот task bundle по raw URL.
4. После чтения выполни critique только для workflow note ниже.
5. Не расширяй scope до plan review всего repo.
6. Prefer the raw link for reading.

## Workflow note to critique

Published-artifact route должен передавать внешний task context через published static manual и published task bundle, а не через copy-paste blob в prompt. Launch package должен содержать и raw URL, и blob URL, но raw URL должен быть preferred source для чтения, а blob URL нужен как reference для человека. Ответ External Web Chat не является repo-truth и не заменяет локальную проверку Codex. `kilo-recorder` должен запускаться только через отдельный recorder package, работать в режиме `response-only except report` и записывать только response file и recorder report. Cleanup должен удалять только временный subtree published task artifacts и не должен затрагивать static manual.

## Expected output

Верни один markdown-ответ строго с этими разделами и в этом порядке:

```md
## Static Manual Readback

## Applied static anchors

## Verdict

## Summary

## Findings

| Severity | Finding | Evidence from provided context | Suggested fix |
|---|---|---|---|

## Minimal Change Set

## Risks Introduced By Suggested Changes

## Questions for Master / Lead Orchestrator

## Out of Scope
```

Требования к содержимому:

- В `## Applied static anchors` перечисли applied anchors и отдельно missing anchors, если такие есть.
- В `## Verdict` используй одно из: `safe`, `safe-with-warnings`, `needs-revision`, `blocked`.
- В `## Findings` перечисли только замечания по wording, boundary clarity и execution-sink discipline.
- В `## Minimal Change Set` предложи только минимальные правки note, без расширения workflow.
- В `## Questions for Master / Lead Orchestrator` задай вопросы только если реально не хватает published context.

## Static manual reference

GitHub URL: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external_agent_static_manual.md

Raw URL: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external_agent_static_manual.md

static_manual_version: EA-STATIC-2026-05-14-V2

required static anchors:
- [EA-READ-FIRST]
- [EA-REQUIRED-READING-ORDER]
- [EA-STATIC-READBACK]
- [EA-CORE-BOUNDARY]
- [EA-TRUTH-RULE]
- [EA-TASK-BUNDLE]
- [EA-GITHUB-LINKS]
- [EA-OUTPUT-WORKFLOW-CRITIQUE]

Prefer the raw link for reading.

## Task bundle reference

external_task_id: EXT-PILOT-002-R2

external_attempt_id: EXT-PILOT-002-R2

handoff URL: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-002-R2/EXT-PILOT-002-R2_handoff.md

handoff raw URL: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-002-R2/EXT-PILOT-002-R2_handoff.md

attached_artifacts: none

Prefer the raw link for reading.
