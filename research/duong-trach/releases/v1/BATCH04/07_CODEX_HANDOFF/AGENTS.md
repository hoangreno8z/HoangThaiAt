# AGENTS.md — DƯƠNG TRẠCH CORPUS GOVERNANCE

## Priority order
1. Safety / law / engineering hard gates.
2. Evidence integrity.
3. Source fidelity.
4. School separation.
5. Deterministic data validation.
6. Product integration.
7. UI/UX.

## Evidence states
- VERIFIED
- PARTIAL
- CONTESTED
- UNKNOWN
- INVALID
- OCR_UNVERIFIED

Never silently promote a state.

## Text layers
- ORIGINAL
- HANVIET
- LITERAL_TRANSLATION
- HISTORICAL_COMMENTARY
- EDITORIAL_ANALYSIS
- MODERN_ENGINEERING
- RULE

Never merge these layers.

## Required provenance
Every publishable rule must reference:
`rule_id -> claim_id -> source_id -> witness`.

## Scope
Core: residential / shop / office / ordinary business / medium enterprise premises.
Exclude palace, imperial city, military formation, court ritual, grand tomb systems unless a passage is explicitly used as historical/conceptual reference and is scope-labelled.

## Coding behavior
- inspect before edit;
- small commits;
- tests before integration;
- no destructive refactor;
- preserve current working production behavior;
- fail closed on missing evidence.
