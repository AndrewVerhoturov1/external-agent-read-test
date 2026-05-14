# External Task Bundle: PILOT-002-R5 recorder payload operator card

## Bundle status

request_prepared

## Agent kind

External Web Chat

## External provider

Any

## External mode

text-chat

## Task profile

wording-draft

## Goal

Составить один короткий и пригодный для копирования операторский текст на русском языке: как человеку правильно пройти путь `External Web Chat -> Recorder Payload -> Kilo Recorder` без ручной сборки metadata.

## Source constraints

- У тебя нет repo authority.
- Не заявляй, что ты видел локальные файлы, git status, git diff или результаты тестов.
- Не трактуй внешний ответ как факт о repo.
- Не придумывай repo-детали, которых нет в provided context.
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
4. После чтения выполни только задачу drafting.
5. Не пиши код, не пиши несколько вариантов, не пиши длинное объяснение.
6. Ответ пиши полностью на русском языке.
7. Сначала верни человекочитаемый результат, а затем готовый `Recorder Payload`, который можно напрямую вставить в `Kilo Recorder`.
8. Prefer the raw link for reading.

## Drafting task

Нужно создать один финальный операторский текст для человека, который объясняет новый flow:

- сначала отправить published package во внешний чат;
- затем взять из ответа только `## Recorder Payload`;
- затем вставить только этот payload в `Kilo Recorder`;
- затем вернуться в Codex со статусом `готово`.

Требования к финальному тексту:

- язык: русский;
- формат: компактная памятка;
- длина: не больше 180 слов;
- структура:
  - короткий заголовок;
  - 5 нумерованных шагов;
  - блок `Не делай этого` с 3 короткими пунктами;
- не ссылаться на локальные файлы, repo, git, тесты или внутренние роли;
- не описывать ручную сборку metadata;
- явно сказать, что в `Kilo Recorder` копируется только `Recorder Payload`;
- явно сказать, что в Codex потом возвращаются только со статусом `готово`.

## Expected output

Верни один markdown-ответ строго с этими разделами и в этом порядке:

```md
## Static Manual Readback

## Applied static anchors

## Final Operator Card

## Recorder Payload
```

Требования к содержимому:

- В `## Applied static anchors` перечисли applied anchors и missing anchors, если такие есть.
- В `## Final Operator Card` верни только один итоговый текст памятки.
- В `## Recorder Payload` верни готовый блок для прямой вставки в `Kilo Recorder`.

Формат секции `## Recorder Payload`:

```md
# Recorder Package: EXT-PILOT-002-R5 / EXT-PILOT-002-R5

## external_task_id

EXT-PILOT-002-R5

## external_attempt_id

EXT-PILOT-002-R5

## response_path

.ai/external_chats/responses/PILOT-002-R5_response.md

## published_links

- static_manual_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external_agent_static_manual.md
- static_manual_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external_agent_static_manual.md
- static_manual_version: EA-STATIC-2026-05-14-V2
- handoff_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-002-R5/EXT-PILOT-002-R5_handoff.md
- handoff_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-002-R5/EXT-PILOT-002-R5_handoff.md

## recording_mode

response-only

## allowed_writes

- .ai/external_chats/responses/PILOT-002-R5_response.md

## raw_response

<вставь сюда только секции этого ответа от `## Static Manual Readback` до `## Final Operator Card` включительно, без секции `## Recorder Payload`, чтобы избежать рекурсивного самовложения>
```

Человек не должен вручную собирать metadata. Готовый `Recorder Payload` должен быть сразу пригоден для прямой вставки в `Kilo Recorder`.

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

external_task_id: EXT-PILOT-002-R5

external_attempt_id: EXT-PILOT-002-R5

handoff URL: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-002-R5/EXT-PILOT-002-R5_handoff.md

handoff raw URL: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-002-R5/EXT-PILOT-002-R5_handoff.md

attached_artifacts: none

Prefer the raw link for reading.
