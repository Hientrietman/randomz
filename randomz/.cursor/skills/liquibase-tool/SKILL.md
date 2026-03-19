---
name: liquibase-tool
description: Execute Liquibase commands via Maven. Use when user wants to preview, validate, apply, or reset database migrations.
---

# Liquibase Tool

## Commands

| Action | Command | Purpose |
|---|---|---|
| **preview** | `mvn liquibase:updateSQL` | Preview raw SQL before applying changes (Safe) |
| **validate** | `mvn liquibase:validate` | Check YAML syntax and checksums |
| **migrate** | `mvn liquibase:update` | Apply new changesets to Database |
| **history** | `mvn liquibase:history` | List all previously applied migrations |
| **drop & migrate** | `mvn liquibase:dropAll && mvn liquibase:update` | **DESTRUCTIVE**: Reset DB and re-apply everything |

## Workflow

1. **Safety First**: If the action is `migrate`, suggest the user run `preview` first to see the raw SQL.
2. **Confirmation**: If `drop & migrate` → MUST ask: "Thao tác này sẽ XÓA TOÀN BỘ DATA hiện tại, bạn chắc chắn muốn làm mới Database không?"
3. **Execution**: Run the command in the integrated terminal.
4. **Log Analysis & Reporting**:
   - **Success**: Summarize exactly which ChangeSets were applied.
   - **Error**:
     - Capture the specific error from the Maven output.
     - **Self-Correction**: Analyze the `.yaml` file causing the error.
     - Suggest a fix immediately (e.g., "Kiểu dữ liệu `uuid` trong file `001-create-player.yaml` đang bị sai cú pháp, bạn có muốn tui sửa lại không?").

## Best Practices

- Luôn kiểm tra file `master.yaml` xem đã `include` file mới chưa trước khi chạy `migrate`.
- Nếu lỗi liên quan đến `Checksum failed`, gợi ý người dùng lệnh `mvn liquibase:clearCheckSums` (chỉ dùng khi đang ở môi trường Dev).
