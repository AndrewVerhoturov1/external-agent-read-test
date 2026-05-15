# External Task Bundle: PILOT-004 simple calculator plan review

## Bundle status

request_prepared

## Agent kind

External Web Chat

## External provider

Any

## External mode

text-chat

## Task profile

plan-review

## Goal

Проверить bounded план `PILOT-004` для доставки маленькой живой фичи: простой веб-калькулятор. Нужен critique плана, micro-scope check, edge cases и минимальный acceptance checklist до repo-authority implementation run.

## Source constraints

- У тебя нет repo authority.
- Не заявляй, что ты видел локальные файлы, git status, git diff, результаты тестов или runtime браузера.
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
- [EA-OUTPUT-PLAN-REVIEW]
- [EA-GITHUB-LINKS]

## Task instructions

1. Сначала прочитай static manual по raw URL.
2. Выполни обязательный static readback.
3. Затем прочитай этот task bundle по raw URL.
4. Оцени только план и продуктовый scope; не делай вид, что знаешь реальное состояние repo сверх явно переданного контекста.
5. Ответ пиши полностью на русском языке.
6. Не предлагай расширять scope до полноценного приложения.
7. Сначала верни человекочитаемый review, а затем готовый `Recorder Payload`, который можно напрямую вставить в `Kilo Recorder`.
8. Prefer the raw link for reading.

## Provided context

### Pilot goal

Нужно доказать, что новый `/kilo` workflow способен доставить маленькую живую продуктовую фичу end-to-end, а не только workflow-docs.

### Mandatory execution path

`External Web Chat -> External Web Chat -> Kilo Code -> Kilo Verifier -> optional Kilo Code fix`

### Agent-first constraints

- Direct Codex execution без pre-approved exception запрещён.
- Agent tasks допускаются только последовательно.
- Нужны substantive runs, а не декоративные.
- External Web Chat должен использоваться только для bounded non-repo-authority reasoning.
- Repo/file-edit implementation step должен идти через Kilo Code.

### Repo-grounded facts already checked locally

- В репозитории уже есть целевая страница: `web/simple_calculator/index.html`.
- Текущая страница является статическим HTML-калькулятором с цифровой клавиатурой и дисплеем.
- Она не совпадает с минимальным pilot scope, потому что pilot требует форму с двумя числовыми полями, явной операцией, кнопками `Рассчитать` и `Очистить`, выводом результата и базовой валидацией.

### Recommended implementation target

Изменять существующий файл `web/simple_calculator/index.html`, а не создавать новый mini-app рядом.

### Proposed product scope

- 2 поля ввода: `Первое число` и `Второе число`
- выбор операции: `+`, `-`, `*`, `/`
- кнопка `Рассчитать`
- кнопка `Очистить`
- отдельная зона результата
- ошибки для пустых значений, невалидного ввода и деления на ноль
- без backend, auth, persistence, router, storage, history и unrelated cleanup

### Proposed workflow plan

1. Использовать существующую страницу `web/simple_calculator/index.html` как единственное место продуктовой реализации.
2. Сделать первый `External Web Chat` run для critique плана, microcopy, edge cases и acceptance checklist.
3. Зафиксировать ответ через `Kilo Recorder` и локальный review Codex как planning input, а не как факт о repo.
4. Сделать второй `External Web Chat` run уже по уточнённому UI/content brief: labels, error text, interaction details.
5. Снова зафиксировать ответ через `Kilo Recorder` и локальный review Codex.
6. Подготовить один узкий `Kilo Code` handoff на реализацию только этого HTML-файла и, если понадобится, минимально связанных product/test files.
7. После implementation run локально проверить diff и scope.
8. Подготовить отдельный `Kilo Verifier` run.
9. Если verifier найдёт реальную проблему, дать один узкий corrective `Kilo Code` run.
10. Сформировать completion report `PILOT-004` с evidence по external-first routing, repo-authority boundaries, verifier и checks.

### Desired implementation shape

Рекомендуемая форма интерфейса:

- простая карточка
- два текстовых/числовых поля ввода с подписями
- один компактный selector операции
- две action-кнопки: `Рассчитать` и `Очистить`
- блоки `Результат` и `Ошибка` либо один status block с явным различением состояний

### Desired checks after implementation

- страница открывается без JS-ошибок
- `2 + 3 = 5`
- `7 - 10 = -3`
- `4 * 2.5 = 10`
- `9 / 3 = 3`
- `9 / 0` показывает понятную ошибку
- пустые поля показывают понятную ошибку
- `Очистить` сбрасывает поля, результат и ошибку

## Review task

Нужно оценить, достаточно ли этот план:

- удерживает scope маленьким и живым;
- корректно разделяет роли между двумя external runs, Kilo implementation и verifier;
- не оставляет скрытых продуктовых решений, которые позже сорвут implementation;
- не превращает second external run в дублирование первого;
- даёт достаточно конкретный acceptance checklist для узкого implementation handoff.

Если видишь проблемы, предлагай только minimal revision, а не новый большой процесс.

## Expected output

Верни один markdown-ответ строго с этими разделами и в этом порядке:

```md
## Static Manual Readback

## Static Check

## Verdict

## Summary

## Plan Strengths

## Findings

## Missing Decisions

## Hidden Dependencies

## Suggested Minimal Revision

## Questions for Master / Strategist

## Out of Scope

## Recorder Payload
```

Требования к содержимому:

- `## Static Check` должен перечислить `STATIC_MANUAL_USED`, `Static manual version`, `Applied static anchors`, `Missing required anchors`.
- `## Verdict` должен использовать одно из значений: `ready`, `ready-with-warnings`, `needs-revision`, `blocked`.
- `## Findings` должен быть в формате таблицы с колонками `Severity`, `Finding`, `Evidence from provided context`, `Suggested fix`.
- Если вопросов нет, в `## Questions for Master / Strategist` напиши `none`.
- В `## Recorder Payload` верни готовый блок для прямой вставки в `Kilo Recorder`.

Формат секции `## Recorder Payload`:

```md
# Recorder Package: EXT-PILOT-004-PLAN / EXT-PILOT-004-PLAN

## external_task_id

EXT-PILOT-004-PLAN

## external_attempt_id

EXT-PILOT-004-PLAN

## response_path

.ai/external_chats/responses/PILOT-004_plan_review_response.md

## published_links

- static_manual_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external_agent_static_manual.md
- static_manual_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external_agent_static_manual.md
- static_manual_version: EA-STATIC-2026-05-14-V2
- handoff_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-004-PLAN/EXT-PILOT-004-PLAN_handoff.md
- handoff_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-004-PLAN/EXT-PILOT-004-PLAN_handoff.md

## recording_mode

response-only

## allowed_writes

- .ai/external_chats/responses/PILOT-004_plan_review_response.md

## raw_response

<вставь сюда только секции этого ответа от `## Static Manual Readback` до `## Out of Scope` включительно, без секции `## Recorder Payload`, чтобы избежать рекурсивного самовложения>
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
- [EA-OUTPUT-PLAN-REVIEW]
- [EA-GITHUB-LINKS]

Prefer the raw link for reading.

## Task bundle reference

external_task_id: EXT-PILOT-004-PLAN

external_attempt_id: EXT-PILOT-004-PLAN

handoff URL: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-004-PLAN/EXT-PILOT-004-PLAN_handoff.md

handoff raw URL: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-004-PLAN/EXT-PILOT-004-PLAN_handoff.md

attached_artifacts: none

Prefer the raw link for reading.
