<!-- Start SDK Example Usage [usage] -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.organizations.listOrganizations({});

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->