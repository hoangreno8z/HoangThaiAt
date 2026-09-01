# DECISION TREE v0.7 — ĐẶT NHÀ TRÊN ĐẤT

```text
PARCEL
  |
  +--> LEGAL BOUNDARY VALID?
  |       no -> STOP
  |
  +--> PLANNING / CONSTRUCTION LINE / LOCAL RULES
  |       |
  |       v
  |    LEGAL BUILDABLE MASK
  |
  +--> HAZARD / EASEMENT / PROTECTION MASKS
  |       |
  |       v
  |    TRUE BUILDABLE REGION
  |
  +--> BUILDING FOOTPRINT FITS?
  |       no -> REDESIGN
  |
  +--> ACCESS / FIRE / DRAINAGE / CLIMATE
  |       fail -> REDESIGN / ESCALATE
  |
  +--> OPEN SPACE GEOMETRY
  |       front court
  |       courtyard
  |       side gaps
  |       rear space
  |
  +--> CLASSICAL FORM MOTIFS
  |       PLAC-001..012
  |
  +--> UNKNOWN / CONFLICTS
  |
  `--> PLACEMENT REPORT
```

## Rule priority
LEGAL_FAIL > SAFETY_FAIL > FUNCTION_FAIL > CLASSICAL_FORM > SCHOOL_RULE > CUSTOM/PREFERENCE
