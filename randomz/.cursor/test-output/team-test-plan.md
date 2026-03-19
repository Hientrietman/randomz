## Test Plan

### 1. Create Team — POST /api/v1/teams
Body: { "name": "Team A", "playerId": "00000000-0000-0000-0000-000000000001" }
Expect:
  - status: 201
  - data.id is not null
  - data.name == "Team A"
  - data.playerId == "00000000-0000-0000-0000-000000000001"

### 2. Validation Error — POST /api/v1/teams
Body: { "name": "" }
Expect:
  - status: 400
  - message contains "name"

