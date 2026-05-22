# External Task Bundle: temp repo `/r1` smoke

## External task id

`EXT-TEMP-R1-0001`

## External attempt id

`ATT-0001`

## Goal

Minimal `/r1` smoke for already-bootstrapped temp consumer repo.

Need test full published-artifact route:

1. external chat reads published static manual first;
2. external chat reads this published handoff bundle second;
3. external chat returns small grounded answer plus full recorder-ready payload.

## Context

This is not production repo. This is temp consumer repo after portable bootstrap from central core.

Grounded local facts already verified by Codex/Kilo:

- temp repo path: `C:\temp\ai_workflow_core_pilot_install`
- bootstrap state exists and is readable
- project name: `ai_workflow_core_pilot_install`
- bootstrap mode: `local-only`
- bootstrap package: `portable`
- canonical source repo: `ai-workflow-core`
- `AGENTS.md` exists in repo root
- local Kilo smoke already succeeded:
  - session file created
  - tiny handoff created
  - tiny report created
- `/v1` smoke already succeeded:
  - notebook entry created
  - `V1_navigation.md` updated

Important boundary:

- you do not have local filesystem access
- do not claim new repo facts beyond static manual + this handoff bundle
- if something is not explicitly provided, mark it as not verified

## Task

Give one small bounded answer:

1. confirm you could follow published-artifact reading path;
2. say whether this looks sufficient for a first real `/r1` route smoke in temp repo;
3. list only real blockers, if any;
4. keep answer short and grounded;
5. return full recorder-ready metadata and payload.

## Required answer shape

Main answer must contain:

- short result
- short reasoning
- clear blockers or `no blocker visible from provided bundle`

Then mandatory sections:

- `## Provider/Model`
- `## Source request`
- `## Recording mode`
- `## Recorder limitations`
- `## Recorder Payload`

## Response target

Expected response path:

`.ai/external_chats/responses/2026-05-22_r1_temp_repo_smoke.md`

## Recorder Payload requirements

Inside `## Recorder Payload` fill:

- `external_task_id: EXT-TEMP-R1-0001`
- `external_attempt_id: ATT-0001`
- `response_path: .ai/external_chats/responses/2026-05-22_r1_temp_repo_smoke.md`
- `recording_mode: response-only`
- `allowed_writes:` only response path above
- `published_links:` include static manual blob/raw and this handoff bundle blob/raw
- `raw_response:` include your full main answer verbatim, but do not include `## Recorder Payload` section inside `raw_response`

## Hard boundaries

- do not invent local repo facts
- do not request more files unless truly blocked
- do not output repo-authority claims
- do not skip recorder payload
