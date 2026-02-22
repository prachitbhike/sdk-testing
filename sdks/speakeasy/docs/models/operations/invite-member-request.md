# InviteMemberRequest

## Example Usage

```typescript
import { InviteMemberRequest } from "openapi/models/operations";

let value: InviteMemberRequest = {
  orgId: "a491b03d-3858-4044-86f6-ed9aa5edb8e9",
  body: {
    email: "Dariana_Welch@yahoo.com",
  },
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `orgId`                                               | *string*                                              | :heavy_check_mark:                                    | N/A                                                   |
| `idempotencyKey`                                      | *string*                                              | :heavy_minus_sign:                                    | Prevents duplicate operations when retrying requests. |
| `body`                                                | [models.MemberInvite](../../models/member-invite.md)  | :heavy_check_mark:                                    | N/A                                                   |