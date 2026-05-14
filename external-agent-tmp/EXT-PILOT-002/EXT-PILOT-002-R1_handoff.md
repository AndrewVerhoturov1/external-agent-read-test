# External Task Bundle: PILOT-002-R1 wording review

## Bundle status

request_prepared

## Agent kind

External Web Chat

## External provider

Any

## External mode

text-chat

## Task profile

wording-review

## Goal

Выполнить bounded wording review короткой workflow-note для published-artifact route. Нужен содержательный внешний ответ, который улучшает формулировки и выделяет риски текста, но не делает утверждений о локальном репозитории как о факте.

## Source constraints

- У тебя нет repo authority.
- Не заявляй, что ты видел локальные файлы, git status, git diff или результаты тестов.
- Не интерпретируй внешний ответ как факт о repo.
- Не придумывай дополнительные файлы, шаги миграции, тесты или детали workflow, которых нет в published context.
- Если информации не хватает, пиши `not available in provided context`.

## Required static anchors

- [EA-READ-FIRST]
- [EA-REQUIRED-READING-ORDER]
- [EA-STATIC-READBACK]
- [EA-CORE-BOUNDARY]
- [EA-TRUTH-RULE]
- [EA-TASK-BUNDLE]
- [EA-GITHUB-LINKS]

## Task instructions

1. Сначала прочитай static manual по raw URL.
2. Выполни обязательный static readback.
3. Затем прочитай этот task bundle по raw URL.
4. После чтения выполни wording review только для note ниже.
5. Prefer the raw link for reading.

## Workflow note to revise

Published-artifact route передаёт внешний контекст через published static manual и published task bundle, а не через copy-paste blob в prompt. Raw URL должен быть preferred source для чтения, а blob URL остаётся только reference для человека. Ответ внешнего чата не является repo-truth и не заменяет локальную проверку Codex. `kilo-recorder` должен записывать response verbatim и отдельный report без review содержимого ответа. Cleanup должен удалять только remote subtree `external-agent-tmp/EXT-PILOT-002/` и не должен затрагивать static manual.

## Expected output

Верни один markdown-ответ строго с этими разделами и в этом порядке:

```md
## Static Manual Readback

## Applied static anchors

## Revised workflow note

## Top 3 wording risks

## Missing context
```

Требования к содержимому:

- В `## Applied static anchors` перечисли применённые anchors и отдельно missing anchors, если такие есть.
- В `## Revised workflow note` дай улучшенную версию note, не расширяя scope.
- В `## Top 3 wording risks` перечисли три риска двусмысленности или неверного прочтения.
- В `## Missing context` укажи только реально отсутствующий контекст, если он мешает качеству wording review.

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

Prefer the raw link for reading.

## Task bundle reference

external_task_id: EXT-PILOT-002

external_attempt_id: EXT-PILOT-002-R1

handoff URL: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-002/EXT-PILOT-002-R1_handoff.md

handoff raw URL: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-002/EXT-PILOT-002-R1_handoff.md

attached_artifacts: none

Prefer the raw link for reading.
