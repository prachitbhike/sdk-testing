# Member

## Example Usage

```typescript
import { Member } from "openapi/models";

let value: Member = {
  id: "d9990040-82be-4532-a0e2-f4aa90bc86db",
  orgId: "7575ceb4-e1b6-46f8-aac8-9fd5da9656be",
  email: "Lenora_Rolfson9@gmail.com",
  role: "viewer",
  joinedAt: new Date("2026-06-25T13:35:30.882Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `orgId`                                                                                       | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `email`                                                                                       | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `role`                                                                                        | [models.MemberRole](../models/member-role.md)                                                 | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `joinedAt`                                                                                    | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |