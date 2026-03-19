## Test Plan

### 1. Create — POST /api/v1/rooms
Body: { "name": "Test Room", "description": "A sample room", "currentMode": "RANDOM", "duration": 60 }
Expect:
  - status: 201
  - data.id is not null
  - data.name == "Test Room"
  - data.status == "NEW"
  - data.currentMode == "RANDOM"
  - data.startTime is not null

### 2. Validation Error — POST /api/v1/rooms
Body: {}
Expect:
  - status: 400
  - message contains "name"

