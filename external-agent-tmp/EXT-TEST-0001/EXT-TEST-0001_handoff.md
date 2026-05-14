# External Chat Request: Test Task

## Request path

`.ai/external_chats/requests/2026-05-14_test_task.md`

## Agent kind

External Web Chat

## External provider

Any

## External mode

text-chat

## Task profile

plan-review

## Цель

Проверить опубликованный task bundle.

## Контекст

Это тестовый handoff bundle для smoke-проверки published-artifact workflow.

## Source constraints

- Внешний чат НЕ имеет доступа к файловой системе repo.
- Любые утверждения о repo требуют локальной проверки.

## Ограничения

- Не придумывать факты о проекте.

## Входные данные

Тестовый task.

## Запреты

- Без секретов.

## Ожидаемый формат ответа

Стандартный canonical skeleton.

## Static manual reference

GitHub URL: `https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external_agent_static_manual.md`
raw URL: `https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external_agent_static_manual.md`
static_manual_version: `EA-STATIC-2026-05-14-V2`
required static anchors:
- [EA-CORE-BOUNDARY]
- [EA-TRUTH-RULE]
- [EA-TASK-BUNDLE]

## Task bundle reference

external_task_id: `EXT-TEST-0001`
external_attempt_id: `EXT-TEST-0001`
handoff URL: `https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external-agent-tmp/EXT-TEST-0001/EXT-TEST-0001_handoff.md`
handoff raw URL: `https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external-agent-tmp/EXT-TEST-0001/EXT-TEST-0001_handoff.md`

## Expected response path

`.ai/external_chats/responses/2026-05-14_test_task.md`

## Cleanup / status rules

- После review: cleanup_done.
