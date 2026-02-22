// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Operations extends APIResource {
  /**
   * Poll an async operation
   */
  retrieve(operationId: string, options?: Core.RequestOptions): Core.APIPromise<OperationRetrieveResponse> {
    return this._client.get(`/operations/${operationId}`, options);
  }

  /**
   * Cancel a running async operation
   */
  cancel(operationId: string, options?: Core.RequestOptions): Core.APIPromise<OperationCancelResponse> {
    return this._client.post(`/operations/${operationId}/cancel`, options);
  }
}

export interface OperationRetrieveResponse {
  id: string;

  created_at: string;

  status: 'pending' | 'running' | 'succeeded' | 'failed' | 'cancelled';

  updated_at: string;

  error?: OperationRetrieveResponse.Error | null;

  progress_pct?: number | null;

  result_url?: string | null;
}

export namespace OperationRetrieveResponse {
  export interface Error {
    code: string;

    message: string;
  }
}

export interface OperationCancelResponse {
  id: string;

  created_at: string;

  status: 'pending' | 'running' | 'succeeded' | 'failed' | 'cancelled';

  updated_at: string;

  error?: OperationCancelResponse.Error | null;

  progress_pct?: number | null;

  result_url?: string | null;
}

export namespace OperationCancelResponse {
  export interface Error {
    code: string;

    message: string;
  }
}

export declare namespace Operations {
  export {
    type OperationRetrieveResponse as OperationRetrieveResponse,
    type OperationCancelResponse as OperationCancelResponse,
  };
}
