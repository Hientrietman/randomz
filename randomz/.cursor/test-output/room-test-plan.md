## Test Plan

### 1. Create Room — POST /api/v1/rooms
Body: { "name": "Room 1", "description": "desc", "currentMode": "RANDOM", "duration": 60, "teamId": "00000000-0000-0000-0000-000000000001" }
Expect:
  - status: 201
  - data.id is not null
  - data.name == "Room 1"
  - data.teamId == "00000000-0000-0000-0000-000000000001"

### 2. Validation Error — POST /api/v1/rooms
Body: { "name": "" }
Expect:
  - status: 400
  - message contains "name"

