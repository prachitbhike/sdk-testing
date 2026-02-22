# InviteMemberResponse

## Example Usage

```typescript
import { InviteMemberResponse } from "openapi/models/operations";

let value: InviteMemberResponse = {
  headers: {
    "key": [
      "<value 1>",
      "<value 2>",
      "<value 3>",
    ],
  },
  result: {
    id: "a0c79041-08f2-416e-b4cf-d9dd08efb302",
    orgId: "1cf01997-0cb4-4324-afb1-5f06f1cc3e51",
    email: "Ellen66@gmail.com",
    role: "member",
    joinedAt: new Date("2025-03-20T19:07:30.031Z"),
  },
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `headers`                               | Record<string, *string*[]>              | :heavy_check_mark:                      | N/A                                     |
| `result`                                | [models.Member](../../models/member.md) | :heavy_check_mark:                      | N/A                                     |