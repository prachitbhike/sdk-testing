// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Webhooks extends APIResource {
  /**
   * Create a webhook endpoint
   */
  create(body: WebhookCreateParams, options?: Core.RequestOptions): Core.APIPromise<WebhookCreateResponse> {
    return this._client.post('/webhooks', { body, ...options });
  }

  /**
   * Retrieve a webhook endpoint
   */
  retrieve(webhookId: string, options?: Core.RequestOptions): Core.APIPromise<WebhookRetrieveResponse> {
    return this._client.get(`/webhooks/${webhookId}`, options);
  }

  /**
   * List webhook endpoints
   */
  list(query?: WebhookListParams, options?: Core.RequestOptions): Core.APIPromise<WebhookListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<WebhookListResponse>;
  list(
    query: WebhookListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/webhooks', { query, ...options });
  }

  /**
   * Delete a webhook endpoint
   */
  delete(webhookId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/webhooks/${webhookId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * List delivery attempts for a webhook
   */
  listDeliveries(
    webhookId: string,
    query?: WebhookListDeliveriesParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookListDeliveriesResponse>;
  listDeliveries(
    webhookId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookListDeliveriesResponse>;
  listDeliveries(
    webhookId: string,
    query: WebhookListDeliveriesParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookListDeliveriesResponse> {
    if (isRequestOptions(query)) {
      return this.listDeliveries(webhookId, {}, query);
    }
    return this._client.get(`/webhooks/${webhookId}/deliveries`, { query, ...options });
  }

  /**
   * Verify a webhook payload signature
   */
  verifySignature(
    webhookId: string,
    body: WebhookVerifySignatureParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookVerifySignatureResponse> {
    return this._client.post(`/webhooks/${webhookId}/verify`, { body, ...options });
  }
}

export interface WebhookCreateResponse {
  id: string;

  active: boolean;

  created_at: string;

  events: Array<
    | 'model.training.started'
    | 'model.training.completed'
    | 'model.training.failed'
    | 'prediction.completed'
    | 'alert.triggered'
    | 'alert.resolved'
    | 'dataset.ready'
    | 'dataset.failed'
  >;

  url: string;

  /**
   * HMAC-SHA256 signing secret (only returned on creation)
   */
  secret?: string;
}

export interface WebhookRetrieveResponse {
  id: string;

  active: boolean;

  created_at: string;

  events: Array<
    | 'model.training.started'
    | 'model.training.completed'
    | 'model.training.failed'
    | 'prediction.completed'
    | 'alert.triggered'
    | 'alert.resolved'
    | 'dataset.ready'
    | 'dataset.failed'
  >;

  url: string;

  /**
   * HMAC-SHA256 signing secret (only returned on creation)
   */
  secret?: string;
}

export interface WebhookListResponse {
  data: Array<unknown>;

  has_more: boolean;

  next_cursor: string | null;
}

export interface WebhookListDeliveriesResponse {
  data: Array<unknown>;

  has_more: boolean;

  next_cursor: string | null;
}

export interface WebhookVerifySignatureResponse {
  valid: boolean;

  reason?: string | null;
}

export interface WebhookCreateParams {
  events: Array<
    | 'model.training.started'
    | 'model.training.completed'
    | 'model.training.failed'
    | 'prediction.completed'
    | 'alert.triggered'
    | 'alert.resolved'
    | 'dataset.ready'
    | 'dataset.failed'
  >;

  url: string;
}

export interface WebhookListParams {
  /**
   * Opaque cursor for cursor-based pagination.
   */
  cursor?: string;

  limit?: number;
}

export interface WebhookListDeliveriesParams {
  /**
   * Opaque cursor for cursor-based pagination.
   */
  cursor?: string;

  limit?: number;
}

export interface WebhookVerifySignatureParams {
  /**
   * Raw JSON payload string
   */
  payload: string;

  /**
   * The X-Chronocast-Signature header value
   */
  signature: string;

  /**
   * The X-Chronocast-Timestamp header value
   */
  timestamp: string;
}

export declare namespace Webhooks {
  export {
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookRetrieveResponse as WebhookRetrieveResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookListDeliveriesResponse as WebhookListDeliveriesResponse,
    type WebhookVerifySignatureResponse as WebhookVerifySignatureResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookListParams as WebhookListParams,
    type WebhookListDeliveriesParams as WebhookListDeliveriesParams,
    type WebhookVerifySignatureParams as WebhookVerifySignatureParams,
  };
}
