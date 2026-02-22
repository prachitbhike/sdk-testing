// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';

export class Predictions extends APIResource {
  /**
   * Run predictions across multiple models in a single request
   */
  createBatch(
    orgId: string,
    projectId: string,
    body: PredictionCreateBatchParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PredictionCreateBatchResponse> {
    return this._client.post(`/organizations/${orgId}/projects/${projectId}/predictions/batch`, {
      body,
      ...options,
    });
  }
}

export interface PredictionCreateBatchResponse {
  id: string;

  results: Array<
    PredictionCreateBatchResponse.PredictionResult | PredictionCreateBatchResponse.BatchItemError
  >;
}

export namespace PredictionCreateBatchResponse {
  export interface PredictionResult {
    id: string;

    created_at: string;

    horizon: number;

    model_id: string;

    points: Array<PredictionResult.Point>;
  }

  export namespace PredictionResult {
    export interface Point {
      timestamp: string;

      value: number;

      confidence_intervals?: Array<Point.ConfidenceInterval>;
    }

    export namespace Point {
      export interface ConfidenceInterval {
        level: number;

        lower: number;

        upper: number;
      }
    }
  }

  export interface BatchItemError {
    code: string;

    index: number;

    message: string;

    result_type: 'error';
  }
}

export interface PredictionCreateBatchParams {
  requests: Array<PredictionCreateBatchParams.Request>;
}

export namespace PredictionCreateBatchParams {
  export interface Request {
    /**
     * Number of time steps to forecast
     */
    horizon: number;

    model_id: string;

    confidence_intervals?: Array<number>;

    /**
     * Override feature values for what-if analysis
     */
    input_overrides?: { [key: string]: number } | null;

    /**
     * If true, results are streamed via SSE
     */
    streaming?: boolean;
  }
}

export declare namespace Predictions {
  export {
    type PredictionCreateBatchResponse as PredictionCreateBatchResponse,
    type PredictionCreateBatchParams as PredictionCreateBatchParams,
  };
}
