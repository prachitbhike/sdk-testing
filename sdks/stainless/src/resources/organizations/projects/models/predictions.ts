// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../resource';
import * as Core from '../../../../core';

export class Predictions extends APIResource {
  /**
   * Run a prediction (optionally streaming via SSE)
   */
  create(
    orgId: string,
    projectId: string,
    modelId: string,
    body: PredictionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PredictionCreateResponse> {
    return this._client.post(`/organizations/${orgId}/projects/${projectId}/models/${modelId}/predict`, {
      body,
      ...options,
    });
  }
}

export interface PredictionCreateResponse {
  id: string;

  created_at: string;

  horizon: number;

  model_id: string;

  points: Array<PredictionCreateResponse.Point>;
}

export namespace PredictionCreateResponse {
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

export interface PredictionCreateParams {
  /**
   * Number of time steps to forecast
   */
  horizon: number;

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

export declare namespace Predictions {
  export {
    type PredictionCreateResponse as PredictionCreateResponse,
    type PredictionCreateParams as PredictionCreateParams,
  };
}
