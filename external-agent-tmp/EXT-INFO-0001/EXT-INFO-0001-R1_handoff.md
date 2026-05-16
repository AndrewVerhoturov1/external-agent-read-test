# External Task Handoff: GMT Sword of Rome brief

## external_task_id

`EXT-INFO-0001`

## external_attempt_id

`EXT-INFO-0001-R1`

## Goal

Дать короткую справку на русском языке о настольном варгейме `Sword of Rome` от `GMT Games` для человека, который просто хочет понять, что это за игра.

## Context

- Это не repo-задача и не задача на редактирование файлов.
- Нужен именно быстрый обзор, а не глубокий исторический или правиловой разбор.
- Ответ должен быть понятен человеку, который не знаком с игрой заранее.

## Hard constraints

- Не делать вид, что у тебя есть доступ к локальному repo или к файлам вне опубликованного bundle.
- Не придумывать точные факты, если они неочевидны или не подтверждаются доступным контекстом.
- Не писать длинный обзор редакций, тиражей или полной истории публикаций.
- Не пересказывать правила подробно.
- Не уходить в исчерпывающий список механик.

## What to cover

Коротко и простыми словами раскрой:

- что это за игра в целом;
- какая у неё тема/эпоха;
- какой у неё масштаб конфликта;
- на сколько игроков она обычно рассчитана;
- примерную сложность для нового игрока;
- чем она примечательна или почему её выделяют.

## Expected output format

Верни один markdown-ответ на русском языке строго в таком формате:

1. Короткий абзац: что это за игра.
2. Затем 4-6 коротких буллетов:
   - тема/эпоха;
   - масштаб;
   - число игроков;
   - примерная сложность;
   - чем игра примечательна.
3. Короткий абзац: кому она может подойти.
4. Затем обязательная секция `## Recorder Payload` с готовым recorder package.

## Recorder Payload contract

После основного ответа обязательно добавь секцию `## Recorder Payload` и внутри неё верни готовый пакет в таком формате:

```md
# Recorder Package: EXT-INFO-0001 / EXT-INFO-0001-R1

## external_task_id

EXT-INFO-0001

## external_attempt_id

EXT-INFO-0001-R1

## response_path

Путь к целевому response-файлу: `.ai/external_chats/responses/2026-05-16_gmt_sword_of_rome_brief_response.md`

## published_links

- static_manual_blob: <подставь значение из launch package>
- static_manual_raw: <подставь значение из launch package>
- static_manual_version: EA-STATIC-2026-05-14-V2
- handoff_blob: <подставь значение из launch package>
- handoff_raw: <подставь значение из launch package>

## recording_mode

response-only

## allowed_writes

- `.ai/external_chats/responses/2026-05-16_gmt_sword_of_rome_brief_response.md`

## raw_response

<вставь сюда только основную часть собственного ответа без секции `## Recorder Payload`, без сокращений и без смысловых правок>
```

## If information is missing

Если какой-то факт недоступен или неочевиден, пиши:

`not available in provided context`

Не угадывай.
