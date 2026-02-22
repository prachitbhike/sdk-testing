// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';

export class Alerts extends APIResource {
  /**
   * Create an alert
   */
  create(
    orgId: string,
    projectId: string,
    body: AlertCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AlertCreateResponse> {
    return this._client.post(`/organizations/${orgId}/projects/${projectId}/alerts`, { body, ...options });
  }

  /**
   * Retrieve an alert
   */
  retrieve(
    orgId: string,
    projectId: string,
    alertId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AlertRetrieveResponse> {
    return this._client.get(`/organizations/${orgId}/projects/${projectId}/alerts/${alertId}`, options);
  }

  /**
   * Update an alert
   */
  update(
    orgId: string,
    projectId: string,
    alertId: string,
    body: AlertUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AlertUpdateResponse> {
    return this._client.patch(`/organizations/${orgId}/projects/${projectId}/alerts/${alertId}`, {
      body,
      ...options,
    });
  }

  /**
   * List alerts in a project
   */
  list(
    orgId: string,
    projectId: string,
    query?: AlertListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AlertListResponse>;
  list(orgId: string, projectId: string, options?: Core.RequestOptions): Core.APIPromise<AlertListResponse>;
  list(
    orgId: string,
    projectId: string,
    query: AlertListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<AlertListResponse> {
    if (isRequestOptions(query)) {
      return this.list(orgId, projectId, {}, query);
    }
    return this._client.get(`/organizations/${orgId}/projects/${projectId}/alerts`, { query, ...options });
  }

  /**
   * Delete an alert
   */
  delete(
    orgId: string,
    projectId: string,
    alertId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.delete(`/organizations/${orgId}/projects/${projectId}/alerts/${alertId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * List alert event history (offset-paginated)
   */
  listHistory(
    orgId: string,
    projectId: string,
    alertId: string,
    query?: AlertListHistoryParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AlertListHistoryResponse>;
  listHistory(
    orgId: string,
    projectId: string,
    alertId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AlertListHistoryResponse>;
  listHistory(
    orgId: string,
    projectId: string,
    alertId: string,
    query: AlertListHistoryParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<AlertListHistoryResponse> {
    if (isRequestOptions(query)) {
      return this.listHistory(orgId, projectId, alertId, {}, query);
    }
    return this._client.get(`/organizations/${orgId}/projects/${projectId}/alerts/${alertId}/history`, {
      query,
      ...options,
    });
  }
}

export interface AlertCreateResponse {
  id: string;

  channels: Array<
    AlertCreateResponse.EmailChannel | AlertCreateResponse.SlackChannel | AlertCreateResponse.WebhookChannel
  >;

  condition:
    | AlertCreateResponse.ThresholdCondition
    | AlertCreateResponse.AnomalyCondition
    | AlertCreateResponse.TrendCondition;

  created_at: string;

  enabled: boolean;

  model_id: string;

  name: string;

  project_id: string;
}

export namespace AlertCreateResponse {
  export interface EmailChannel {
    address: string;

    type: 'email';
  }

  export interface SlackChannel {
    channel_id: string;

    type: 'slack';

    webhook_url: string;
  }

  export interface WebhookChannel {
    type: 'webhook';

    url: string;

    secret?: string;
  }

  export interface ThresholdCondition {
    duration_minutes: number;

    metric: string;

    operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq';

    type: 'threshold';

    value: number;
  }

  export interface AnomalyCondition {
    /**
     * 0 = least sensitive, 1 = most sensitive
     */
    sensitivity: number;

    type: 'anomaly';

    min_deviation_pct?: number;
  }

  export interface TrendCondition {
    direction: 'increasing' | 'decreasing' | 'either';

    slope_threshold: number;

    type: 'trend';

    window_size: number;
  }
}

export interface AlertRetrieveResponse {
  id: string;

  channels: Array<
    | AlertRetrieveResponse.EmailChannel
    | AlertRetrieveResponse.SlackChannel
    | AlertRetrieveResponse.WebhookChannel
  >;

  condition:
    | AlertRetrieveResponse.ThresholdCondition
    | AlertRetrieveResponse.AnomalyCondition
    | AlertRetrieveResponse.TrendCondition;

  created_at: string;

  enabled: boolean;

  model_id: string;

  name: string;

  project_id: string;
}

export namespace AlertRetrieveResponse {
  export interface EmailChannel {
    address: string;

    type: 'email';
  }

  export interface SlackChannel {
    channel_id: string;

    type: 'slack';

    webhook_url: string;
  }

  export interface WebhookChannel {
    type: 'webhook';

    url: string;

    secret?: string;
  }

  export interface ThresholdCondition {
    duration_minutes: number;

    metric: string;

    operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq';

    type: 'threshold';

    value: number;
  }

  export interface AnomalyCondition {
    /**
     * 0 = least sensitive, 1 = most sensitive
     */
    sensitivity: number;

    type: 'anomaly';

    min_deviation_pct?: number;
  }

  export interface TrendCondition {
    direction: 'increasing' | 'decreasing' | 'either';

    slope_threshold: number;

    type: 'trend';

    window_size: number;
  }
}

export interface AlertUpdateResponse {
  id: string;

  channels: Array<
    AlertUpdateResponse.EmailChannel | AlertUpdateResponse.SlackChannel | AlertUpdateResponse.WebhookChannel
  >;

  condition:
    | AlertUpdateResponse.ThresholdCondition
    | AlertUpdateResponse.AnomalyCondition
    | AlertUpdateResponse.TrendCondition;

  created_at: string;

  enabled: boolean;

  model_id: string;

  name: string;

  project_id: string;
}

export namespace AlertUpdateResponse {
  export interface EmailChannel {
    address: string;

    type: 'email';
  }

  export interface SlackChannel {
    channel_id: string;

    type: 'slack';

    webhook_url: string;
  }

  export interface WebhookChannel {
    type: 'webhook';

    url: string;

    secret?: string;
  }

  export interface ThresholdCondition {
    duration_minutes: number;

    metric: string;

    operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq';

    type: 'threshold';

    value: number;
  }

  export interface AnomalyCondition {
    /**
     * 0 = least sensitive, 1 = most sensitive
     */
    sensitivity: number;

    type: 'anomaly';

    min_deviation_pct?: number;
  }

  export interface TrendCondition {
    direction: 'increasing' | 'decreasing' | 'either';

    slope_threshold: number;

    type: 'trend';

    window_size: number;
  }
}

export interface AlertListResponse {
  data: Array<unknown>;

  has_more: boolean;

  next_cursor: string | null;
}

export interface AlertListHistoryResponse {
  data: Array<unknown>;

  limit: number;

  offset: number;

  total: number;
}

export interface AlertCreateParams {
  channels: Array<
    AlertCreateParams.EmailChannel | AlertCreateParams.SlackChannel | AlertCreateParams.WebhookChannel
  >;

  condition:
    | AlertCreateParams.ThresholdCondition
    | AlertCreateParams.AnomalyCondition
    | AlertCreateParams.TrendCondition;

  model_id: string;

  name: string;

  enabled?: boolean;
}

export namespace AlertCreateParams {
  export interface EmailChannel {
    address: string;

    type: 'email';
  }

  export interface SlackChannel {
    channel_id: string;

    type: 'slack';

    webhook_url: string;
  }

  export interface WebhookChannel {
    type: 'webhook';

    url: string;

    secret?: string;
  }

  export interface ThresholdCondition {
    duration_minutes: number;

    metric: string;

    operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq';

    type: 'threshold';

    value: number;
  }

  export interface AnomalyCondition {
    /**
     * 0 = least sensitive, 1 = most sensitive
     */
    sensitivity: number;

    type: 'anomaly';

    min_deviation_pct?: number;
  }

  export interface TrendCondition {
    direction: 'increasing' | 'decreasing' | 'either';

    slope_threshold: number;

    type: 'trend';

    window_size: number;
  }
}

export interface AlertUpdateParams {
  channels?: Array<
    AlertUpdateParams.EmailChannel | AlertUpdateParams.SlackChannel | AlertUpdateParams.WebhookChannel
  >;

  condition?:
    | AlertUpdateParams.ThresholdCondition
    | AlertUpdateParams.AnomalyCondition
    | AlertUpdateParams.TrendCondition;

  enabled?: boolean;

  name?: string;
}

export namespace AlertUpdateParams {
  export interface EmailChannel {
    address: string;

    type: 'email';
  }

  export interface SlackChannel {
    channel_id: string;

    type: 'slack';

    webhook_url: string;
  }

  export interface WebhookChannel {
    type: 'webhook';

    url: string;

    secret?: string;
  }

  export interface ThresholdCondition {
    duration_minutes: number;

    metric: string;

    operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq';

    type: 'threshold';

    value: number;
  }

  export interface AnomalyCondition {
    /**
     * 0 = least sensitive, 1 = most sensitive
     */
    sensitivity: number;

    type: 'anomaly';

    min_deviation_pct?: number;
  }

  export interface TrendCondition {
    direction: 'increasing' | 'decreasing' | 'either';

    slope_threshold: number;

    type: 'trend';

    window_size: number;
  }
}

export interface AlertListParams {
  /**
   * Opaque cursor for cursor-based pagination.
   */
  cursor?: string;

  limit?: number;
}

export interface AlertListHistoryParams {
  limit?: number;

  offset?: number;

  /**
   * Only return events triggered after this timestamp
   */
  since?: string;

  /**
   * Only return events triggered before this timestamp
   */
  until?: string;
}

export declare namespace Alerts {
  export {
    type AlertCreateResponse as AlertCreateResponse,
    type AlertRetrieveResponse as AlertRetrieveResponse,
    type AlertUpdateResponse as AlertUpdateResponse,
    type AlertListResponse as AlertListResponse,
    type AlertListHistoryResponse as AlertListHistoryResponse,
    type AlertCreateParams as AlertCreateParams,
    type AlertUpdateParams as AlertUpdateParams,
    type AlertListParams as AlertListParams,
    type AlertListHistoryParams as AlertListHistoryParams,
  };
}
