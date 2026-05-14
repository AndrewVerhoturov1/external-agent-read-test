# External Task Bundle: PILOT-002-R3 human instruction critique

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

Выполнить bounded critique короткой human-facing инструкции для запуска маршрута `External Web Chat -> Kilo Recorder`. Нужен понятный и практичный внешний ответ, который улучшает инструкцию для обычного человека, но не делает утверждений о локальном репозитории как о факте.

## Source constraints

- У тебя нет repo authority.
- Не заявляй, что ты видел локальные файлы, git status, git diff или результаты тестов.
- Не трактуй внешний ответ как факт о repo.
- Не придумывай дополнительные workflow-слои, migration-steps, тесты, commits или repo-детали, которых нет в provided context.
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
4. После чтения выполни critique только для инструкции ниже.
5. Не расширяй scope до plan review всего repo.
6. Ответ пиши полностью на русском языке.
7. В конце ответа верни готовый `Recorder Payload`, который человек сможет просто скопировать в `Kilo Recorder` без редактирования.
8. Prefer the raw link for reading.

## Human instruction to critique

1. Открой static manual и task bundle по raw-ссылкам.
2. Отправь внешний prompt во внешний чат.
3. Получи обычный ответ и проверь, что в конце есть секция `## Recorder Payload`.
4. Скопируй `Recorder Payload` целиком в `Kilo Recorder`.
5. Дождись, пока `Kilo Recorder` запишет response-файл.
6. После этого вернись в Codex и напиши только `готово`.

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

## Recorder Payload
```

Требования к содержимому:

- В `## Verdict` используй одно из: `safe`, `safe-with-warnings`, `needs-revision`, `blocked`.
- В `## Findings` перечисли только замечания по ясности шагов, двусмысленности для обычного человека и boundaries execution-sink.
- В `## Minimal Change Set` дай улучшенную версию human instruction без расширения workflow.
- В `## Recorder Payload` верни готовый блок для прямой вставки в `Kilo Recorder`.

Формат секции `## Recorder Payload`:

```md
# Recorder Package: EXT-PILOT-002-R3 / EXT-PILOT-002-R3

## external_task_id

EXT-PILOT-002-R3

## external_attempt_id

EXT-PILOT-002-R3

## response_path

.ai/external_chats/responses/PILOT-002-R3_response.md

## published_links

- static_manual_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external_agent_static_manual.md
- static_manual_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external_agent_static_manual.md
- static_manual_version: EA-STATIC-2026-05-14-V2
- handoff_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-002-R3/EXT-PILOT-002-R3_handoff.md
- handoff_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-002-R3/EXT-PILOT-002-R3_handoff.md

## recording_mode

response-only

## allowed_writes

- .ai/external_chats/responses/PILOT-002-R3_response.md

## raw_response

<вставь сюда полный ответ этого внешнего запуска, начиная с `## Static Manual Readback` и до конца, без смысловых правок>
```

Человек не должен ничего собирать вручную: готовый `Recorder Payload` должен быть сразу пригоден для прямой вставки в `Kilo Recorder`.

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

external_task_id: EXT-PILOT-002-R3

external_attempt_id: EXT-PILOT-002-R3

handoff URL: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-002-R3/EXT-PILOT-002-R3_handoff.md

handoff raw URL: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-002-R3/EXT-PILOT-002-R3_handoff.md

attached_artifacts: none

Prefer the raw link for reading.
