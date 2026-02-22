# Organizations

Types:

- <code><a href="./src/resources/organizations/organizations.ts">OrganizationCreateResponse</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">OrganizationRetrieveResponse</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">OrganizationUpdateResponse</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">OrganizationListResponse</a></code>

Methods:

- <code title="post /organizations">client.organizations.<a href="./src/resources/organizations/organizations.ts">create</a>({ ...params }) -> OrganizationCreateResponse</code>
- <code title="get /organizations/{org_id}">client.organizations.<a href="./src/resources/organizations/organizations.ts">retrieve</a>(orgId) -> OrganizationRetrieveResponse</code>
- <code title="patch /organizations/{org_id}">client.organizations.<a href="./src/resources/organizations/organizations.ts">update</a>(orgId, { ...params }) -> OrganizationUpdateResponse</code>
- <code title="get /organizations">client.organizations.<a href="./src/resources/organizations/organizations.ts">list</a>({ ...params }) -> OrganizationListResponse</code>
- <code title="delete /organizations/{org_id}">client.organizations.<a href="./src/resources/organizations/organizations.ts">delete</a>(orgId) -> void</code>

## Members

Types:

- <code><a href="./src/resources/organizations/members.ts">MemberListResponse</a></code>
- <code><a href="./src/resources/organizations/members.ts">MemberInviteResponse</a></code>

Methods:

- <code title="get /organizations/{org_id}/members">client.organizations.members.<a href="./src/resources/organizations/members.ts">list</a>(orgId, { ...params }) -> MemberListResponse</code>
- <code title="post /organizations/{org_id}/members">client.organizations.members.<a href="./src/resources/organizations/members.ts">invite</a>(orgId, { ...params }) -> MemberInviteResponse</code>

## Projects

Types:

- <code><a href="./src/resources/organizations/projects/projects.ts">ProjectCreateResponse</a></code>
- <code><a href="./src/resources/organizations/projects/projects.ts">ProjectRetrieveResponse</a></code>
- <code><a href="./src/resources/organizations/projects/projects.ts">ProjectListResponse</a></code>

Methods:

- <code title="post /organizations/{org_id}/projects">client.organizations.projects.<a href="./src/resources/organizations/projects/projects.ts">create</a>(orgId, { ...params }) -> ProjectCreateResponse</code>
- <code title="get /organizations/{org_id}/projects/{project_id}">client.organizations.projects.<a href="./src/resources/organizations/projects/projects.ts">retrieve</a>(orgId, projectId) -> ProjectRetrieveResponse</code>
- <code title="get /organizations/{org_id}/projects">client.organizations.projects.<a href="./src/resources/organizations/projects/projects.ts">list</a>(orgId, { ...params }) -> ProjectListResponse</code>
- <code title="delete /organizations/{org_id}/projects/{project_id}">client.organizations.projects.<a href="./src/resources/organizations/projects/projects.ts">delete</a>(orgId, projectId) -> void</code>

### Datasets

Types:

- <code><a href="./src/resources/organizations/projects/datasets.ts">DatasetCreateResponse</a></code>
- <code><a href="./src/resources/organizations/projects/datasets.ts">DatasetRetrieveResponse</a></code>
- <code><a href="./src/resources/organizations/projects/datasets.ts">DatasetListResponse</a></code>
- <code><a href="./src/resources/organizations/projects/datasets.ts">DatasetUploadResponse</a></code>

Methods:

- <code title="post /organizations/{org_id}/projects/{project_id}/datasets">client.organizations.projects.datasets.<a href="./src/resources/organizations/projects/datasets.ts">create</a>(orgId, projectId, { ...params }) -> DatasetCreateResponse</code>
- <code title="get /organizations/{org_id}/projects/{project_id}/datasets/{dataset_id}">client.organizations.projects.datasets.<a href="./src/resources/organizations/projects/datasets.ts">retrieve</a>(orgId, projectId, datasetId) -> DatasetRetrieveResponse</code>
- <code title="get /organizations/{org_id}/projects/{project_id}/datasets">client.organizations.projects.datasets.<a href="./src/resources/organizations/projects/datasets.ts">list</a>(orgId, projectId, { ...params }) -> DatasetListResponse</code>
- <code title="delete /organizations/{org_id}/projects/{project_id}/datasets/{dataset_id}">client.organizations.projects.datasets.<a href="./src/resources/organizations/projects/datasets.ts">delete</a>(orgId, projectId, datasetId) -> void</code>
- <code title="get /organizations/{org_id}/projects/{project_id}/datasets/{dataset_id}/download">client.organizations.projects.datasets.<a href="./src/resources/organizations/projects/datasets.ts">download</a>(orgId, projectId, datasetId) -> Response</code>
- <code title="post /organizations/{org_id}/projects/{project_id}/datasets/upload">client.organizations.projects.datasets.<a href="./src/resources/organizations/projects/datasets.ts">upload</a>(orgId, projectId, { ...params }) -> DatasetUploadResponse</code>

### Models

Types:

- <code><a href="./src/resources/organizations/projects/models/models.ts">ModelCreateResponse</a></code>
- <code><a href="./src/resources/organizations/projects/models/models.ts">ModelRetrieveResponse</a></code>
- <code><a href="./src/resources/organizations/projects/models/models.ts">ModelListResponse</a></code>
- <code><a href="./src/resources/organizations/projects/models/models.ts">ModelTrainResponse</a></code>

Methods:

- <code title="post /organizations/{org_id}/projects/{project_id}/models">client.organizations.projects.models.<a href="./src/resources/organizations/projects/models/models.ts">create</a>(orgId, projectId, { ...params }) -> ModelCreateResponse</code>
- <code title="get /organizations/{org_id}/projects/{project_id}/models/{model_id}">client.organizations.projects.models.<a href="./src/resources/organizations/projects/models/models.ts">retrieve</a>(orgId, projectId, modelId) -> ModelRetrieveResponse</code>
- <code title="get /organizations/{org_id}/projects/{project_id}/models">client.organizations.projects.models.<a href="./src/resources/organizations/projects/models/models.ts">list</a>(orgId, projectId, { ...params }) -> ModelListResponse</code>
- <code title="delete /organizations/{org_id}/projects/{project_id}/models/{model_id}">client.organizations.projects.models.<a href="./src/resources/organizations/projects/models/models.ts">delete</a>(orgId, projectId, modelId) -> void</code>
- <code title="post /organizations/{org_id}/projects/{project_id}/models/{model_id}/train">client.organizations.projects.models.<a href="./src/resources/organizations/projects/models/models.ts">train</a>(orgId, projectId, modelId, { ...params }) -> ModelTrainResponse</code>

#### Predictions

Types:

- <code><a href="./src/resources/organizations/projects/models/predictions.ts">PredictionCreateResponse</a></code>

Methods:

- <code title="post /organizations/{org_id}/projects/{project_id}/models/{model_id}/predict">client.organizations.projects.models.predictions.<a href="./src/resources/organizations/projects/models/predictions.ts">create</a>(orgId, projectId, modelId, { ...params }) -> PredictionCreateResponse</code>

### Predictions

Types:

- <code><a href="./src/resources/organizations/projects/predictions.ts">PredictionCreateBatchResponse</a></code>

Methods:

- <code title="post /organizations/{org_id}/projects/{project_id}/predictions/batch">client.organizations.projects.predictions.<a href="./src/resources/organizations/projects/predictions.ts">createBatch</a>(orgId, projectId, { ...params }) -> PredictionCreateBatchResponse</code>

### Alerts

Types:

- <code><a href="./src/resources/organizations/projects/alerts.ts">AlertCreateResponse</a></code>
- <code><a href="./src/resources/organizations/projects/alerts.ts">AlertRetrieveResponse</a></code>
- <code><a href="./src/resources/organizations/projects/alerts.ts">AlertUpdateResponse</a></code>
- <code><a href="./src/resources/organizations/projects/alerts.ts">AlertListResponse</a></code>
- <code><a href="./src/resources/organizations/projects/alerts.ts">AlertListHistoryResponse</a></code>

Methods:

- <code title="post /organizations/{org_id}/projects/{project_id}/alerts">client.organizations.projects.alerts.<a href="./src/resources/organizations/projects/alerts.ts">create</a>(orgId, projectId, { ...params }) -> AlertCreateResponse</code>
- <code title="get /organizations/{org_id}/projects/{project_id}/alerts/{alert_id}">client.organizations.projects.alerts.<a href="./src/resources/organizations/projects/alerts.ts">retrieve</a>(orgId, projectId, alertId) -> AlertRetrieveResponse</code>
- <code title="patch /organizations/{org_id}/projects/{project_id}/alerts/{alert_id}">client.organizations.projects.alerts.<a href="./src/resources/organizations/projects/alerts.ts">update</a>(orgId, projectId, alertId, { ...params }) -> AlertUpdateResponse</code>
- <code title="get /organizations/{org_id}/projects/{project_id}/alerts">client.organizations.projects.alerts.<a href="./src/resources/organizations/projects/alerts.ts">list</a>(orgId, projectId, { ...params }) -> AlertListResponse</code>
- <code title="delete /organizations/{org_id}/projects/{project_id}/alerts/{alert_id}">client.organizations.projects.alerts.<a href="./src/resources/organizations/projects/alerts.ts">delete</a>(orgId, projectId, alertId) -> void</code>
- <code title="get /organizations/{org_id}/projects/{project_id}/alerts/{alert_id}/history">client.organizations.projects.alerts.<a href="./src/resources/organizations/projects/alerts.ts">listHistory</a>(orgId, projectId, alertId, { ...params }) -> AlertListHistoryResponse</code>

# Operations

Types:

- <code><a href="./src/resources/operations.ts">OperationRetrieveResponse</a></code>
- <code><a href="./src/resources/operations.ts">OperationCancelResponse</a></code>

Methods:

- <code title="get /operations/{operation_id}">client.operations.<a href="./src/resources/operations.ts">retrieve</a>(operationId) -> OperationRetrieveResponse</code>
- <code title="post /operations/{operation_id}/cancel">client.operations.<a href="./src/resources/operations.ts">cancel</a>(operationId) -> OperationCancelResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookCreateResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookRetrieveResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListDeliveriesResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookVerifySignatureResponse</a></code>

Methods:

- <code title="post /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> WebhookCreateResponse</code>
- <code title="get /webhooks/{webhook_id}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>(webhookId) -> WebhookRetrieveResponse</code>
- <code title="get /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>({ ...params }) -> WebhookListResponse</code>
- <code title="delete /webhooks/{webhook_id}">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(webhookId) -> void</code>
- <code title="get /webhooks/{webhook_id}/deliveries">client.webhooks.<a href="./src/resources/webhooks.ts">listDeliveries</a>(webhookId, { ...params }) -> WebhookListDeliveriesResponse</code>
- <code title="post /webhooks/{webhook_id}/verify">client.webhooks.<a href="./src/resources/webhooks.ts">verifySignature</a>(webhookId, { ...params }) -> WebhookVerifySignatureResponse</code>
