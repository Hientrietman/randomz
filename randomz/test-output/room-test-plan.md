## Test Plan

### 1. Create — POST /api/v1/rooms
Body: { "name": "Test Room", "description": "A fun room", "currentMode": "RANDOM", "duration": 60 }
Expect:
  - status: 201
  - data.id is not null (UUID)
  - data.name == "Test Room"
  - data.status == "NEW"

### 2. Validation Error — POST /api/v1/rooms
Body: {}
Expect:
  - status: 400
  - message contains "name"
