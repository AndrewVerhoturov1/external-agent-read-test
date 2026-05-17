# External Task Bundle: critique of `/v1` and `kilo-notebook`

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

Проверить proposed workflow change: новый shortcut `/v1` (`/в1`) для вопроса во внешний чат без handoff и новый Kilo mode `kilo-notebook` для записи и публикации ответа. Нужна критика дизайна системы и rollout-плана, без выдуманных утверждений о локальном repo.

## Source constraints

- У тебя нет repo authority.
- Не заявляй, что ты видел локальные файлы, git status, git diff, тесты или runtime вне published context.
- Не делай выводы о текущей корректности кода как о факте.
- Не предлагай edits, commits, scripts или validators так, будто они уже существуют, если этого нет в published context.
- Если контекста не хватает, пиши `not available in provided context`.

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
4. Выполни critique только для design summary и rollout plan ниже.
5. Не расширяй scope до review всего репозитория или перепроектирования всего workflow.
6. Ответ пиши полностью на русском языке.
7. В конце ответа верни готовый `Recorder Payload`, который человек сможет просто вставить в `Kilo Recorder`.
8. Prefer the raw link for reading.

## Proposed design summary

В основной workflow `Codex + Kilo` предлагается добавить новый легковесный внешний слой:

- Уже существуют:
  - `/r1` (`/р1`) — preparation mode для полноценного `External Web Chat request` / external launch package;
  - `kilo-recorder` — узкий mode для записи внешнего ответа в response file.
- Предлагается добавить:
  - `/v1` (`/в1`) — shortcut для быстрого вопроса во внешний чат;
  - `kilo-notebook` — новый mode для сохранения и публикации итогового внешнего ответа.

Ожидаемое различие `/v1` против `/r1`:

- `/r1` создаёт полноценный `external launch package` с task bundle / published handoff.
- `/v1` не создаёт handoff и не создаёт ordinary request-файл.
- При `/v1` Codex пишет только copy-paste prompt для внешнего чата.
- Этот prompt должен включать:
  - уникальный `external_question_id` длиной 8 символов;
  - ссылку на `external_chat_rules.md`;
  - ссылку на `repo_navigation.md`;
  - ссылки на конкретные файлы или папки проекта, нужные для вопроса.

Ожидаемый flow `/v1`:

1. Пользователь вызывает `/v1`.
2. Codex готовит copy-paste prompt для External Web Chat.
3. Внешний чат читает опубликованные GitHub-файлы, общается с человеком столько, сколько нужно, и готовит итоговый ответ.
4. Внешний чат должен вернуть:
   - сам итоговый ответ;
   - тот же `external_question_id`;
   - короткий абзац-описание ответа для обновления `repo_navigation.md`.
5. Человек передаёт этот итоговый ответ в новый режим `kilo-notebook`.
6. `kilo-notebook`:
   - сохраняет ответ в правильный локальный файл с `external_question_id` в имени;
   - публикует этот файл в GitHub;
   - обновляет `repo_navigation.md` коротким описанием;
   - возвращает человеку локальный путь, GitHub blob/raw URL и `external_question_id`.

Новые обязательные published context files:

- `external_chat_rules.md`
  - как должен вести себя внешний чат;
  - какие claims запрещены;
  - как возвращать `external_question_id`;
  - как оформлять итоговый ответ.
- `repo_navigation.md`
  - где лежит game design;
  - где лежит architecture;
  - где лежат external answers;
  - где лежат accepted decisions;
  - где лежат handoff / report / review;
  - какие файлы читать для разных типов вопросов.

Предлагаемое место хранения notebook-ответов:

- `.ai/external_chats/notebook/`
- имя файла: `YYYY-MM-DD_<external_question_id>_<slug>.md`

Предлагаемый content saved answer:

- `external_question_id`
- source prompt summary
- provider/model if available
- links to context files
- full external answer
- short paragraph for `repo_navigation.md`
- saved date

## Proposed rollout plan

1. Зафиксировать термины и boundaries:
   - `/r1` остаётся full external package route;
   - `/v1` становится lightweight question route;
   - `kilo-notebook` не смешивается с `kilo-recorder`.
2. Добавить docs/spec layer:
   - `external_chat_rules.md`
   - `repo_navigation.md`
   - prompt template для `/v1`
3. Добавить storage contract:
   - naming для `external_question_id`
   - путь `.ai/external_chats/notebook/`
   - response file schema
4. Добавить новый Kilo mode:
   - `kilo-notebook`
   - validator changes
   - notebook package contract
5. Добавить publish/save automation:
   - local save
   - GitHub publish
   - update `repo_navigation.md`
6. Добавить smoke-test route на одном synthetic external answer

## Critique focus

Проверь именно эти вопросы:

1. Достаточно ли чётко разведены `/v1` и `/r1`, или между ними останется operator confusion?
2. Правильная ли граница между `kilo-recorder` и `kilo-notebook`?
3. Не слишком ли много обязанностей у `kilo-notebook`:
   - save response
   - publish to GitHub
   - update `repo_navigation.md`
4. Достаточно ли `external_question_id` длиной 8 символов, и какие collision/finding risks есть?
5. Не создаёт ли `repo_navigation.md` лишнюю хрупкость или источник drift?
6. Нужно ли обновление `repo_navigation.md` делать автоматически сразу в `kilo-notebook`, или лучше через отдельный review gate?
7. Какие failure modes и abuse modes здесь самые опасные?
8. Какие минимальные изменения в rollout-плане снизят риск, не раздувая систему?

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

## Recommended Boundary Changes

## Minimal Rollout Reorder

## Failure Modes To Guard First

## Questions for Master / Lead Orchestrator

## Out of Scope

## Recorder Payload
```

Требования к содержимому:

- В `## Applied static anchors` перечисли applied anchors и missing anchors, если они есть.
- В `## Verdict` используй одно из: `safe`, `safe-with-warnings`, `needs-revision`, `blocked`.
- В `## Findings` перечисли только замечания по system boundaries, operator clarity, persistence flow, publish/update risks.
- В `## Recommended Boundary Changes` предложи только изменения boundaries и responsibilities, без полного redesign всего workflow.
- В `## Minimal Rollout Reorder` предложи самый маленький безопасный порядок внедрения.
- В `## Failure Modes To Guard First` перечисли только high-signal early risks.
- В `## Questions for Master / Lead Orchestrator` задавай вопросы только если их нельзя закрыть из published context.
- В `## Recorder Payload` верни готовый блок для прямой вставки в `Kilo Recorder`.

Формат секции `## Recorder Payload`:

```md
# Recorder Package: EXT-WF-0001 / EXT-WF-0001-R1

## external_task_id

EXT-WF-0001

## external_attempt_id

EXT-WF-0001-R1

## response_path

.ai/external_chats/responses/2026-05-17_external_workflow_v1_notebook_critique_response.md

## published_links

- static_manual_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external_agent_static_manual.md
- static_manual_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external_agent_static_manual.md
- static_manual_version: EA-STATIC-2026-05-14-V2
- handoff_blob: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-WF-0001/EXT-WF-0001-R1_handoff.md
- handoff_raw: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-WF-0001/EXT-WF-0001-R1_handoff.md

## recording_mode

response-only

## allowed_writes

- .ai/external_chats/responses/2026-05-17_external_workflow_v1_notebook_critique_response.md

## raw_response

<вставь сюда полный ответ этого внешнего запуска, начиная с `## Static Manual Readback` и до конца, без смысловых правок>
```

Внутри `## raw_response` нужно вставить полный собственный ответ этого запуска целиком, без сокращений и без смысловых правок. Человек не должен ничего собирать вручную: готовый `Recorder Payload` должен быть сразу пригоден для прямой вставки в `Kilo Recorder`.

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

external_task_id: EXT-WF-0001

external_attempt_id: EXT-WF-0001-R1

handoff URL: https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-WF-0001/EXT-WF-0001-R1_handoff.md

handoff raw URL: https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-WF-0001/EXT-WF-0001-R1_handoff.md

attached_artifacts: none

Prefer the raw link for reading.
