# External Task Bundle: PILOT-002-R4 browser game prompt

## Bundle status

request_prepared

## Agent kind

External Web Chat

## External provider

Any

## External mode

text-chat

## Task profile

prompt-drafting

## Goal

Составить один готовый, подробный и самодостаточный prompt на русском языке для генерации браузерной игры по мотивам «Каркассона» в 2D векторном стиле.

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
4. После чтения выполни только задачу создания prompt.
5. Не пиши код, не пиши план реализации, не пиши несколько вариантов.
6. Ответ пиши полностью на русском языке.
7. Сначала верни человекочитаемый результат, а затем готовый `Recorder Payload`, который можно напрямую вставить в `Kilo Recorder`.
8. Prefer the raw link for reading.

## Prompt task

Нужно создать один финальный prompt для генерации браузерной игры по мотивам «Каркассона».

Требования к этому финальному prompt:

- игра запускается в браузере;
- визуальный стиль: чистый 2D vector, вид сверху, аккуратные тайлы, средневековая атмосфера;
- core loop: размещение тайлов, стыковка дорог, полей, городов и монастырей;
- базовые правила должны быть понятны из prompt без внешних ссылок;
- prompt должен описывать:
  - игровой цикл;
  - основные сущности;
  - визуальный стиль;
  - интерфейс;
  - состояние игры;
  - поведение мыши;
  - условия подсчёта очков;
  - завершение партии;
- prompt должен быть пригоден как стартовое ТЗ для генерации прототипа;
- не нужно писать код;
- не нужно писать объяснения, вступления, комментарии или варианты;
- нужно вернуть только один финальный prompt в markdown;
- не ссылаться на репозиторий, локальные файлы или внешний контекст;
- если используются допущения, они должны быть вписаны прямо в prompt как явные правила.

## Expected output

Верни один markdown-ответ строго с этими разделами и в этом порядке:

```md
## Static Manual Readback

## Applied static anchors

## Final Prompt

## Recorder Payload
```

Требования к содержимому:

- В `## Applied static anchors` перечисли applied anchors и missing anchors, если такие есть.
- В `## Final Prompt` верни только один итоговый prompt для внешней генерации игры.
- В `## Recorder Payload` верни готовый блок для прямой вставки в `Kilo Recorder`.

Формат секции `## Recorder Payload`:

```md
# Recorder Package: EXT-PILOT-002-R4 / EXT-PILOT-002-R4

## external_task_id

EXT-PILOT-002-R4

## external_attempt_id

EXT-PILOT-002-R4

## response_path

.ai/external_chats/responses/PILOT-002-R4_response.md

## published_links

- static_manual_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external_agent_static_manual.md
- static_manual_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external_agent_static_manual.md
- static_manual_version: EA-STATIC-2026-05-14-V2
- handoff_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-002-R4/EXT-PILOT-002-R4_handoff.md
- handoff_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-002-R4/EXT-PILOT-002-R4_handoff.md

## recording_mode

response-only

## allowed_writes

- .ai/external_chats/responses/PILOT-002-R4_response.md

## raw_response

<вставь сюда только секции этого ответа от `## Static Manual Readback` до `## Final Prompt` включительно, без секции `## Recorder Payload`, чтобы избежать рекурсивного самовложения>
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

external_task_id: EXT-PILOT-002-R4

external_attempt_id: EXT-PILOT-002-R4

handoff URL: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-002-R4/EXT-PILOT-002-R4_handoff.md

handoff raw URL: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-002-R4/EXT-PILOT-002-R4_handoff.md

attached_artifacts: none

Prefer the raw link for reading.
