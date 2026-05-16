# External Task Handoff: caveman-stats upstream analysis

## External task metadata

- external_task_id: `EXT-INFO-0002`
- external_attempt_id: `EXT-INFO-0002-R1`
- task_type: `bounded-second-opinion`
- provider_class: `GPT-5/5.5`

## Goal

Разобрать upstream-репозиторий `JuliusBrussee/caveman` и ответить, какие именно файлы и в какие целевые пути нужно положить, чтобы заработал `caveman-stats`.

Нужен не общий обзор, а точная install-map:
- какие файлы обязательны;
- какие файлы опциональны;
- какие файлы относятся только к `Claude Code`;
- какие файлы потенциально можно адаптировать под `Codex`.

## Important context

Локально уже подтверждено следующее:

- skill `caveman-stats` установлен как обычная папка skill:
  - `C:\Users\andre\.agents\skills\caveman-stats\SKILL.md`
  - `C:\Users\andre\.agents\skills\caveman-stats\README.md`
- в этой папке нет `hooks/caveman-stats.js`
- в skill-тексте прямо сказано, что вывод зависит от hook `caveman-mode-tracker`
- локально не найдено hook-регистрации для `caveman`
- в текущем Codex-конфиге нет явной настройки hooks под `caveman`

Вывод из локальной проверки: установлен только skill-layer, но не hook/runtime-layer.

## What to inspect upstream

Основной upstream-источник:
- repo: `https://github.com/JuliusBrussee/caveman`

Нужно найти и проверить:
- сам skill `caveman-stats`
- `caveman-mode-tracker`
- `caveman-stats.js`
- возможные `hooks.json`, plugin manifests, installer scripts, setup docs
- любые файлы, которые обеспечивают:
  - перехват команды `/caveman-stats`
  - чтение session log
  - форматирование статистики
  - statusline badge / lifetime savings suffix

## Required analysis

Сделай аккуратный разбор и верни:

1. `Dependency chain`
   Для `caveman-stats`: какой файл вызывает какой, через какой hook/manifest/config.

2. `Required files`
   Полный список обязательных upstream-файлов для работы `/caveman-stats`.

3. `Target paths`
   Для каждого обязательного файла:
   - `source path in upstream repo`
   - `target path in local install`
   - `why needed`

4. `Claude-specific vs Codex-portable`
   Раздели:
   - что завязано на `Claude Code` runtime и его hooks;
   - что является просто skill/content;
   - что можно теоретически перенести в `Codex`, если вручную адаптировать.

5. `Minimal install set`
   Самый маленький набор файлов, который нужен именно для `caveman-stats`, а не для всего `caveman`.

6. `Why current install is incomplete`
   Коротко объясни, почему установка одних skill-папок не даёт рабочего `/caveman-stats`.

7. `Codex feasibility note`
   Честно оцени:
   - можно ли просто скопировать файлы и ожидать, что это заработает в Codex;
   - или нужен отдельный runtime/hook integration layer, которого в Codex может не быть.

## Constraints

- Не выдавай предположения за факт.
- Если структура репозитория изменилась, прямо это отметь.
- Не утверждай ничего о локальном repo или локальной машине beyond context above.
- Не предлагай правки локальных файлов как уже проверенный факт. Можно только рекомендовать как hypothesis/next step.

## Desired output format

Верни markdown с разделами:

```md
# caveman-stats upstream install map

## Summary

## Dependency chain

## Required files

| Upstream source | Target path | Required? | Why |
|---|---|---|---|

## Claude-specific parts

## Codex-portable parts

## Minimal install set

## Why current install is incomplete

## Feasibility for Codex
```

После основного ответа обязательно добавь секцию:

```md
## Recorder Payload
```

И внутри неё дай готовый recorder payload для сохранения ответа в файл, не забыв:
- `external_task_id: EXT-INFO-0002`
- `external_attempt_id: EXT-INFO-0002-R1`

