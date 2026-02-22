// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import { OperationCancelResponse, OperationRetrieveResponse, Operations } from './resources/operations';
import {
  WebhookCreateParams,
  WebhookCreateResponse,
  WebhookListDeliveriesParams,
  WebhookListDeliveriesResponse,
  WebhookListParams,
  WebhookListResponse,
  WebhookRetrieveResponse,
  WebhookVerifySignatureParams,
  WebhookVerifySignatureResponse,
  Webhooks,
} from './resources/webhooks';
import {
  OrganizationCreateParams,
  OrganizationCreateResponse,
  OrganizationListParams,
  OrganizationListResponse,
  OrganizationRetrieveResponse,
  OrganizationUpdateParams,
  OrganizationUpdateResponse,
  Organizations,
} from './resources/organizations/organizations';

const environments = {
  production: 'https://api.chronocast.dev/v1',
  local_development: 'http://localhost:3737/v1',
};
type Environment = keyof typeof environments;

export interface ClientOptions {
  /**
   * Defaults to process.env['CHRONOCAST_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Defaults to process.env['CHRONOCAST_BEARER_TOKEN'].
   */
  bearerToken?: string | null | undefined;

  /**
   * Specifies the environment to use for the API.
   *
   * Each environment maps to a different base URL:
   * - `production` corresponds to `https://api.chronocast.dev/v1`
   * - `local_development` corresponds to `http://localhost:3737/v1`
   */
  environment?: Environment | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['WNDRCO_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

/**
 * API Client for interfacing with the Wndrco API.
 */
export class Wndrco extends Core.APIClient {
  apiKey: string;
  bearerToken: string | null;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Wndrco API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['CHRONOCAST_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.bearerToken=process.env['CHRONOCAST_BEARER_TOKEN'] ?? null]
   * @param {Environment} [opts.environment=production] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['WNDRCO_BASE_URL'] ?? https://api.chronocast.dev/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('WNDRCO_BASE_URL'),
    apiKey = Core.readEnv('CHRONOCAST_API_KEY'),
    bearerToken = Core.readEnv('CHRONOCAST_BEARER_TOKEN') ?? null,
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.WndrcoError(
        "The CHRONOCAST_API_KEY environment variable is missing or empty; either provide it, or instantiate the Wndrco client with an apiKey option, like new Wndrco({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      bearerToken,
      ...opts,
      baseURL,
      environment: opts.environment ?? 'production',
    };

    if (baseURL && opts.environment) {
      throw new Errors.WndrcoError(
        'Ambiguous URL; The `baseURL` option (or WNDRCO_BASE_URL env var) and the `environment` option are given. If you want to use the environment you must pass baseURL: null',
      );
    }

    super({
      baseURL: options.baseURL || environments[options.environment || 'production'],
      baseURLOverridden: baseURL ? baseURL !== environments[options.environment || 'production'] : false,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;
    this.idempotencyHeader = 'Idempotency-Key';

    this.apiKey = apiKey;
    this.bearerToken = bearerToken;
  }

  organizations: API.Organizations = new API.Organizations(this);
  operations: API.Operations = new API.Operations(this);
  webhooks: API.Webhooks = new API.Webhooks(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== environments[this._options.environment || 'production'];
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...this.apiKeyAuth(opts),
      ...this.bearerAuth(opts),
    };
  }

  protected apiKeyAuth(opts: Core.FinalRequestOptions): Core.Headers {
    return { 'X-Api-Key': this.apiKey };
  }

  protected bearerAuth(opts: Core.FinalRequestOptions): Core.Headers {
    if (this.bearerToken == null) {
      return {};
    }
    return { Authorization: `Bearer ${this.bearerToken}` };
  }

  static Wndrco = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static WndrcoError = Errors.WndrcoError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Wndrco.Organizations = Organizations;
Wndrco.Operations = Operations;
Wndrco.Webhooks = Webhooks;

export declare namespace Wndrco {
  export type RequestOptions = Core.RequestOptions;

  export {
    Organizations as Organizations,
    type OrganizationCreateResponse as OrganizationCreateResponse,
    type OrganizationRetrieveResponse as OrganizationRetrieveResponse,
    type OrganizationUpdateResponse as OrganizationUpdateResponse,
    type OrganizationListResponse as OrganizationListResponse,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationUpdateParams as OrganizationUpdateParams,
    type OrganizationListParams as OrganizationListParams,
  };

  export {
    Operations as Operations,
    type OperationRetrieveResponse as OperationRetrieveResponse,
    type OperationCancelResponse as OperationCancelResponse,
  };

  export {
    Webhooks as Webhooks,
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

export { toFile, fileFromPath } from './uploads';
export {
  WndrcoError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default Wndrco;
