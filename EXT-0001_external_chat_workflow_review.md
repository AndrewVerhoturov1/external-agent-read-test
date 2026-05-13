# External Chat Handoff EXT-0001

Task ID: `EXT-0001`

Task title: Review external-chat-vs-Kilo execution policy

Task type: `workflow-critique`

Expected role: `Внешний критик`

Static manual GitHub URL:

https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external_agent_static_manual.md

Static manual raw URL:

https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external_agent_static_manual.md

---

## Static manual requirement

Before doing this task, you must read and apply the static manual:

`external_agent_static_manual.md`

Use the raw URL as the preferred source:

https://raw.githubusercontent.com/AndrewVerhoturov1/external-agent-read-test/main/external_agent_static_manual.md

If the raw URL is unavailable, use the GitHub page URL:

https://github.com/AndrewVerhoturov1/external-agent-read-test/blob/main/external_agent_static_manual.md

If you cannot read the static manual, stop and answer only:

`STATIC_MANUAL_MISSING`

You must not perform this handoff without the static manual.

---

## Required static anchors

You must apply these static manual anchors:

- [EA-READ-FIRST]
- [EA-AGENT-GLOSSARY]
- [EA-CORE-BOUNDARY]
- [EA-TRUTH-RULE]
- [EA-KILO-VS-EXTERNAL]
- [EA-JUNIOR-ORCHESTRATOR]
- [EA-HANDOFF-PRIORITY]
- [EA-EVIDENCE-RULES]
- [EA-SEVERITY]
- [EA-OUTPUT-WORKFLOW-CRITIQUE]
- [EA-GITHUB-LINKS]
- [EA-FAILURE-MODES]

In your answer, list these anchors in the `Static Check` section.

If any required static anchor is missing or unclear, stop and report:

`REQUIRED_STATIC_ANCHOR_MISSING`

---

## Task

Review the proposed workflow policy below.

The goal of the policy is to define how the system chooses between:

1. Kilo tasks;
2. External Chat tasks.

The policy should be safe, clear, token-efficient, and practical for a human-controlled Codex + Kilo workflow.

You must identify:

1. role boundary problems;
2. unsafe assumptions;
3. missing rules;
4. token-waste risks;
5. unclear responsibility between Стратег, Главный оркестратор, Младший оркестратор, Kilo, and External Chat;
6. improvements needed before this policy is added to the main workflow document.

Do not rewrite the entire workflow.

Return a critique and a minimal safe change set.

---

## Provided context

### Context A: Current intended agent names

The workflow will use these Russian human-friendly names:

```text
1. Человек / Мастер
2. Стратег
3. Главный оркестратор
4. Младший оркестратор
5. Кило исполнитель
6. Кило верификатор
7. Кило отладка
8. Кило запись
9. Внешний чат
10. Внешний критик
11. Упаковку контекста делает младший оркестратор
12. Советник топ GPT
```

Meaning:

- Человек / Мастер is the human owner.
- Стратег creates the master plan.
- Главный оркестратор owns the execution session.
- Младший оркестратор owns one block.
- Kilo agents work locally in the repository.
- Внешний чат works externally with provided context.
- Внешний критик is an external chat used specifically for critique.
- Context packaging is not a separate agent; it is done by the Младший оркестратор.
- Советник топ GPT is a strong model used for strategic/high-risk advice.

---

### Context B: Proposed policy text

The proposed policy is:

```md
## Принцип выбора младшего исполнителя: Kilo или внешний чат

Kilo-задачи и задачи для внешнего чата в этой системе считаются двумя видами младших исполнительских задач. Они занимают похожее место в workflow: получают ограниченную постановку, работают в заданных границах и возвращают результат в ожидаемом формате. Разница между ними не в “старшинстве”, а в доступных возможностях.

Kilo — младший локальный исполнитель. Он работает с репозиторием: читает файлы, ищет по проекту, вносит разрешённые изменения, запускает команды, пишет report и может выполнять локальную проверку.

Внешний чат — младший внешний исполнитель. Он не имеет живого доступа к репозиторию, но может работать с подготовленным handoff и static manual: анализировать предоставленный контекст, критиковать план, предлагать альтернативы, находить логические противоречия, улучшать тексты, проектировать тест-кейсы или давать bounded second opinion.

Младший оркестратор может готовить задачи обоих типов:

```text
Младший оркестратор
→ готовит Kilo handoff
→ или готовит handoff для внешнего чата
```

Какой тип младшего исполнителя использовать, определяет Главный оркестратор при проектировании блока. Также это может определить Стратег в своём planning-чате в любой момент, если видит, что задачу выгоднее вынести во внешний чат или, наоборот, обязательно выполнить локально через Kilo.

По умолчанию, если с задачей могут справиться и Kilo, и внешний чат, приоритет отдаётся внешнему чату. Причина простая: внешний чат может использовать более сильные модели, не расходует локальные Kilo-лимиты и не загрязняет локальный execution-контекст деталями рассуждения.

Kilo выбирается вместо внешнего чата, если задаче нужен локальный доступ или локальное действие:

- чтение файлов, которые не включены в handoff;
- поиск по репозиторию;
- изменение файлов;
- запуск тестов;
- запуск скриптов;
- проверка git status / git diff;
- локальная capability-проверка;
- работа с workspace;
- запись report в repo;
- проверка фактического результата.

Итоговое правило:

> Внешний чат — первый выбор для bounded reasoning по подготовленному контексту.  
> Kilo — обязательный выбор для локального доступа, локальных изменений и локальной проверки.
```

---

### Context C: Proposed external chat two-file model

The proposed external chat model is:

```md
## Two-file external chat model

The external chat works with two files:

1. A large static manual.
2. A small task-specific handoff.

The static manual contains:
- agent roles;
- hard rules;
- response formats;
- safety rules;
- task types;
- evidence requirements;
- examples or templates.

The static manual is loaded once at the start of an external chat session.

For each concrete task, the Master sends a short handoff.

Each handoff must:
- require the external chat to use the static manual;
- list required static anchors;
- define the task;
- provide context or links;
- define expected output.

The Junior Orchestrator creates task-specific handoffs for external chat.

The Master manually sends links or files to the external chat.

External chat responses are recorded by Kilo Recording Agent.

The Lead or Junior Orchestrator checks whether the external answer is usable.

External chat answers are not accepted repository facts until locally verified.
```

---

### Context D: Known constraints

Known constraints:

```text
1. External Chat can open GitHub and raw GitHub links in the current smoke test.
2. External Chat still must not be treated as having live repository access.
3. Static manual can be large.
4. Task-specific handoff should stay short.
5. Junior Orchestrator should not copy the full static manual into every handoff.
6. The Master manually uploads or links files for now.
7. No automatic GitHub publishing for now.
8. No Custom GPT for the first version.
9. The system should still prefer External Chat when both External Chat and Kilo can do the task.
10. Kilo remains mandatory for local file access, edits, scripts, tests, git status, git diff, and local verification.
```

---

## What to analyze

Analyze the policy using the static manual and the provided context.

Specifically check:

1. Is the “External Chat preferred when both can do the task” rule safe enough?
2. Are there missing exceptions where Kilo should still be preferred?
3. Is the Junior Orchestrator’s responsibility clear?
4. Is the Master’s manual upload/linking role clear?
5. Is Kilo Recording Agent’s role clear enough?
6. Is there any risk that External Chat becomes treated as repository truth?
7. Is the two-file model likely to reduce repeated token waste?
8. What must be added to make this policy safe for the main workflow document?

---

## Required output format

Use this exact format.

```md
## Static Check

STATIC_MANUAL_USED: yes/no

Static manual version:

Applied static anchors:

Missing required anchors:

## Verdict

safe / safe-with-warnings / needs-revision / blocked

## Summary

Short summary of your review.

## Role Boundary Review

Explain whether the boundaries between:
- Стратег;
- Главный оркестратор;
- Младший оркестратор;
- Kilo;
- Внешний чат;
- Мастер

are clear enough.

## Token Economy Review

Explain whether the two-file static manual + handoff model actually reduces repeated token waste.

## Findings

| Severity | Finding | Evidence from provided context | Suggested fix |
|---|---|---|---|

## Minimal Change Set

List only the minimal changes needed before adding this policy to the main workflow document.

## Risks Introduced By Suggested Changes

List any risks created by your own recommendations.

## Questions for Master / Lead Orchestrator

Ask only important questions that block safe adoption.

## Out of Scope

List anything you did not analyze because it was not available in provided context.
```

---

## Important constraints for your answer

Do not:

- claim that tests passed;
- claim that the repository was checked;
- claim that git state is known;
- propose automatic publishing;
- propose Custom GPT as required;
- rewrite the entire workflow document;
- infer files not included in the handoff;
- ignore missing static manual anchors.

If information is missing, write:

`not available in provided context`
