## Test Plan

### 1. Create — POST /api/v1/players
Body: { "name": "Alice" }
Expect:
  - status: 201
  - data.id is not null
  - data.name == "Alice"

### 2. Validation Error — POST /api/v1/players
Body: {}
Expect:
  - status: 400
  - message contains "name"
