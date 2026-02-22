# NotificationChannel


## Supported Types

### `models.EmailChannel`

```typescript
const value: models.EmailChannel = {
  type: "email",
  address: "Randy.Wintheiser28@yahoo.com",
};
```

### `models.SlackChannel`

```typescript
const value: models.SlackChannel = {
  type: "slack",
  channelId: "<id>",
  webhookUrl: "https://unrealistic-angle.info/",
};
```

### `models.WebhookChannel`

```typescript
const value: models.WebhookChannel = {
  type: "webhook",
  url: "https://tiny-smog.org",
};
```

