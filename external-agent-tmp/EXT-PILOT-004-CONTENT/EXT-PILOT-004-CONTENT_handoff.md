# External Task Bundle: PILOT-004 simple calculator UI content brief

## Bundle status

request_prepared

## Agent kind

External Web Chat

## External provider

Any

## External mode

text-chat

## Task profile

ux-copy

## Goal

Подготовить компактный финальный UI/content brief для маленького веб-калькулятора в рамках `PILOT-004`: labels, error text, result text, interaction details и initial state. Это не plan review и не critique workflow, а узкий content/spec output перед repo-authority implementation run.

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
- [EA-GITHUB-LINKS]

## Task instructions

1. Сначала прочитай static manual по raw URL.
2. Выполни обязательный static readback.
3. Затем прочитай этот task bundle по raw URL.
4. Выполни только UI/content task; не повторяй общий workflow critique.
5. Ответ пиши полностью на русском языке.
6. Держи output компактным и implementation-ready.
7. Не расширяй scope до advanced calculator, accessibility audit, mobile redesign или feature backlog.
8. Сначала верни человекочитаемый результат, а затем готовый `Recorder Payload`, который можно напрямую вставить в `Kilo Recorder`.
9. Prefer the raw link for reading.

## Provided context

### Pilot scope

Нужна маленькая живая фича:

- 2 числовых поля
- операции: `+`, `-`, `*`, `/`
- кнопка `Рассчитать`
- кнопка `Очистить`
- вывод результата
- защита от деления на ноль
- базовая валидация пустых и невалидных значений

### Existing local decision

Repo-grounded target уже подтверждён локально: implementation будет идти в существующий `web/simple_calculator/index.html`. Этот факт дан как provided context; внешний агент не должен заявлять, что сам видел файл.

### Boundaries

- без auth
- без backend
- без persistence
- без больших refactor
- без unrelated cleanup

### Distilled planning decisions after run 1

Следующие решения уже считаются принятыми для этого bounded brief:

- второй external run не повторяет plan critique и не обсуждает workflow;
- задача этого run: только UI/content brief;
- default operation: `+`;
- input values trim-ятся перед разбором;
- поддерживаются отрицательные и дробные числа через точку;
- decimal comma считается invalid input и не поддерживается;
- новый валидный расчёт после ошибки очищает прошлую ошибку и показывает результат;
- `Очистить` возвращает UI в initial state.

### Desired UI shape

- заголовок карточки
- подпись и поле `Первое число`
- подпись и поле `Второе число`
- подпись и selector операции
- кнопка `Рассчитать`
- кнопка `Очистить`
- блок результата
- блок ошибки или единый status block с чётким различением результата и ошибки

### Desired interaction behavior

- на пустых полях показывается понятная ошибка;
- на невалидном числе показывается понятная ошибка;
- на делении на ноль показывается понятная ошибка;
- после успешного расчёта ошибка не показывается;
- `Очистить` очищает поля, результат, ошибку и возвращает операцию к `+`.

## UI/content task

Нужно выдать один компактный implementation-ready brief, который поможет следующему `Kilo Code` run без повторной product-дискуссии.

Нужный результат:

- короткий recommended screen title;
- labels для обоих полей и selector;
- button labels;
- placeholder texts либо явный вывод, что placeholders лучше не использовать;
- точные error texts:
  - пустые значения;
  - невалидное число;
  - деление на ноль;
- format для успешного результата;
- краткие interaction rules:
  - initial state;
  - success state;
  - error state;
  - clear/reset state;
- 1 короткий section `Out of scope reminders`.

Ограничения на тон:

- простой, нейтральный, без маркетингового пафоса;
- русский язык;
- короткие фразы;
- без «умных» подсказок, onboarding или helper essay.

## Expected output

Верни один markdown-ответ строго с этими разделами и в этом порядке:

```md
## Static Manual Readback

## Applied static anchors

## Final UI Brief

## Recorder Payload
```

Требования к содержимому:

- `## Applied static anchors` должен перечислить applied anchors и missing anchors, если такие есть.
- `## Final UI Brief` должен содержать только эти подразделы и в этом порядке:
  - `### Screen Title`
  - `### Labels`
  - `### Buttons`
  - `### Placeholders`
  - `### Error Text`
  - `### Result Format`
  - `### Interaction Rules`
  - `### Out of Scope Reminders`
- В `### Error Text` используй короткую таблицу.
- В `### Interaction Rules` используй короткий flat list.
- В `## Recorder Payload` верни готовый блок для прямой вставки в `Kilo Recorder`.

Формат секции `## Recorder Payload`:

```md
# Recorder Package: EXT-PILOT-004-CONTENT / EXT-PILOT-004-CONTENT

## external_task_id

EXT-PILOT-004-CONTENT

## external_attempt_id

EXT-PILOT-004-CONTENT

## response_path

.ai/external_chats/responses/PILOT-004_ui_content_response.md

## published_links

- static_manual_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external_agent_static_manual.md
- static_manual_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external_agent_static_manual.md
- static_manual_version: EA-STATIC-2026-05-14-V2
- handoff_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-004-CONTENT/EXT-PILOT-004-CONTENT_handoff.md
- handoff_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-004-CONTENT/EXT-PILOT-004-CONTENT_handoff.md

## recording_mode

response-only

## allowed_writes

- .ai/external_chats/responses/PILOT-004_ui_content_response.md

## raw_response

<вставь сюда только секции этого ответа от `## Static Manual Readback` до `## Final UI Brief` включительно, без секции `## Recorder Payload`, чтобы избежать рекурсивного самовложения>
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

external_task_id: EXT-PILOT-004-CONTENT

external_attempt_id: EXT-PILOT-004-CONTENT

handoff URL: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-PILOT-004-CONTENT/EXT-PILOT-004-CONTENT_handoff.md

handoff raw URL: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-PILOT-004-CONTENT/EXT-PILOT-004-CONTENT_handoff.md

attached_artifacts: none

Prefer the raw link for reading.
