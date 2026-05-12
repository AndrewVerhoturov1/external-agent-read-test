# External Agent GitHub Read Smoke Test

## Test Metadata

Package ID: `EA-GITHUB-READ-SMOKE-2026-05-13-V1`

File name: `external-agent-read-smoke-test.md`

Expected reader role: `External Chat`

Control phrase: `blue-lantern-47`

Control number: `918273`

This file is a smoke test for checking whether an external chat can read a Markdown file from GitHub or raw.githubusercontent.com.

---

## Instructions for the external chat

You must answer using only the contents of this file.

Do not guess.

Do not use general knowledge.

If you cannot read the file, say:

`FILE_NOT_READABLE`

If you can read this file, answer the questions below exactly.

---

## Questions

1. What is the Package ID?
2. What is the control phrase?
3. What is the control number?
4. What is the file name?
5. What exact phrase must you say if you cannot read the file?
6. According to this file, are you allowed to guess?
7. According to this file, what source should you use to answer?

---

## Required response format

```md
## GitHub Read Smoke Test Result

Read status: READ_OK / FILE_NOT_READABLE

Package ID:

Control phrase:

Control number:

File name:

Cannot-read phrase:

Guessing allowed: yes/no

Allowed source:

One-sentence conclusion:

Hidden consistency check

The correct one-sentence conclusion must mention both:

blue-lantern-47
918273

If the answer does not mention both, the read test should be treated as failed.


---

# 5. Какие ссылки дать внешнему чату

После commit открой файл на GitHub. У тебя будет обычная ссылка вида:

```text
https://github.com/<USER>/<REPO>/blob/main/external-agent-read-smoke-test.md

Потом нажми кнопку Raw на странице файла. Получишь raw-ссылку вида:

https://raw.githubusercontent.com/<USER>/<REPO>/main/external-agent-read-smoke-test.md

Для теста дай внешнему чату сначала обычную GitHub-ссылку, потом отдельным тестом raw-ссылку.
