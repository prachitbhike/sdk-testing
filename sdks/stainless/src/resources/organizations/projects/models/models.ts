// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../resource';
import { isRequestOptions } from '../../../../core';
import * as Core from '../../../../core';
import * as PredictionsAPI from './predictions';
import { PredictionCreateParams, PredictionCreateResponse, Predictions } from './predictions';

export class Models extends APIResource {
  predictions: PredictionsAPI.Predictions = new PredictionsAPI.Predictions(this._client);

  /**
   * Create a forecast model
   */
  create(
    orgId: string,
    projectId: string,
    body: ModelCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelCreateResponse> {
    return this._client.post(`/organizations/${orgId}/projects/${projectId}/models`, { body, ...options });
  }

  /**
   * Retrieve a forecast model
   */
  retrieve(
    orgId: string,
    projectId: string,
    modelId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelRetrieveResponse> {
    return this._client.get(`/organizations/${orgId}/projects/${projectId}/models/${modelId}`, options);
  }

  /**
   * List forecast models
   */
  list(
    orgId: string,
    projectId: string,
    query?: ModelListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelListResponse>;
  list(orgId: string, projectId: string, options?: Core.RequestOptions): Core.APIPromise<ModelListResponse>;
  list(
    orgId: string,
    projectId: string,
    query: ModelListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelListResponse> {
    if (isRequestOptions(query)) {
      return this.list(orgId, projectId, {}, query);
    }
    return this._client.get(`/organizations/${orgId}/projects/${projectId}/models`, { query, ...options });
  }

  /**
   * Delete a forecast model
   */
  delete(
    orgId: string,
    projectId: string,
    modelId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.delete(`/organizations/${orgId}/projects/${projectId}/models/${modelId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Start model training (async, returns operation to poll)
   */
  train(
    orgId: string,
    projectId: string,
    modelId: string,
    body?: ModelTrainParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelTrainResponse>;
  train(
    orgId: string,
    projectId: string,
    modelId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelTrainResponse>;
  train(
    orgId: string,
    projectId: string,
    modelId: string,
    body: ModelTrainParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelTrainResponse> {
    if (isRequestOptions(body)) {
      return this.train(orgId, projectId, modelId, {}, body);
    }
    return this._client.post(`/organizations/${orgId}/projects/${projectId}/models/${modelId}/train`, {
      body,
      ...options,
    });
  }
}

export interface ModelCreateResponse {
  id: string;

  algorithm: ModelCreateResponse.ArimaAlgorithm | ModelCreateResponse.NeuralAlgorithm | unknown;

  created_at: string;

  dataset_id: string;

  feature_columns: Array<string>;

  name: string;

  project_id: string;

  status: 'draft' | 'training' | 'trained' | 'failed' | 'archived';

  target_column: string;

  hyperparameters?: ModelCreateResponse.Hyperparameters | null;

  metrics?: ModelCreateResponse.Metrics | null;

  trained_at?: string | null;
}

export namespace ModelCreateResponse {
  export interface ArimaAlgorithm {
    order_d: number;

    order_p: number;

    order_q: number;

    type: 'arima';

    seasonal?: boolean;
  }

  export interface NeuralAlgorithm {
    architecture: 'lstm' | 'transformer' | 'tcn';

    hidden_size: number;

    layers: number;

    type: 'neural';

    dropout?: number;
  }

  export interface Hyperparameters {
    batch_size?: number;

    early_stopping?: boolean;

    epochs?: number;

    learning_rate?: number;
  }

  export interface Metrics {
    /**
     * Mean absolute error
     */
    mae: number;

    /**
     * Mean absolute percentage error
     */
    mape: number;

    r_squared: number;

    /**
     * Root mean squared error
     */
    rmse: number;

    training_duration_seconds: number;
  }
}

export interface ModelRetrieveResponse {
  id: string;

  algorithm: ModelRetrieveResponse.ArimaAlgorithm | ModelRetrieveResponse.NeuralAlgorithm | unknown;

  created_at: string;

  dataset_id: string;

  feature_columns: Array<string>;

  name: string;

  project_id: string;

  status: 'draft' | 'training' | 'trained' | 'failed' | 'archived';

  target_column: string;

  hyperparameters?: ModelRetrieveResponse.Hyperparameters | null;

  metrics?: ModelRetrieveResponse.Metrics | null;

  trained_at?: string | null;
}

export namespace ModelRetrieveResponse {
  export interface ArimaAlgorithm {
    order_d: number;

    order_p: number;

    order_q: number;

    type: 'arima';

    seasonal?: boolean;
  }

  export interface NeuralAlgorithm {
    architecture: 'lstm' | 'transformer' | 'tcn';

    hidden_size: number;

    layers: number;

    type: 'neural';

    dropout?: number;
  }

  export interface Hyperparameters {
    batch_size?: number;

    early_stopping?: boolean;

    epochs?: number;

    learning_rate?: number;
  }

  export interface Metrics {
    /**
     * Mean absolute error
     */
    mae: number;

    /**
     * Mean absolute percentage error
     */
    mape: number;

    r_squared: number;

    /**
     * Root mean squared error
     */
    rmse: number;

    training_duration_seconds: number;
  }
}

export interface ModelListResponse {
  data: Array<unknown>;

  has_more: boolean;

  next_cursor: string | null;
}

export interface ModelTrainResponse {
  id: string;

  created_at: string;

  status: 'pending' | 'running' | 'succeeded' | 'failed' | 'cancelled';

  updated_at: string;

  error?: ModelTrainResponse.Error | null;

  progress_pct?: number | null;

  result_url?: string | null;
}

export namespace ModelTrainResponse {
  export interface Error {
    code: string;

    message: string;
  }
}

export interface ModelCreateParams {
  algorithm: ModelCreateParams.ArimaAlgorithm | ModelCreateParams.NeuralAlgorithm | unknown;

  dataset_id: string;

  feature_columns: Array<string>;

  name: string;

  target_column: string;

  hyperparameters?: ModelCreateParams.Hyperparameters;
}

export namespace ModelCreateParams {
  export interface ArimaAlgorithm {
    order_d: number;

    order_p: number;

    order_q: number;

    type: 'arima';

    seasonal?: boolean;
  }

  export interface NeuralAlgorithm {
    architecture: 'lstm' | 'transformer' | 'tcn';

    hidden_size: number;

    layers: number;

    type: 'neural';

    dropout?: number;
  }

  export interface Hyperparameters {
    batch_size?: number;

    early_stopping?: boolean;

    epochs?: number;

    learning_rate?: number;
  }
}

export interface ModelListParams {
  /**
   * Opaque cursor for cursor-based pagination.
   */
  cursor?: string;

  limit?: number;

  status?: 'draft' | 'training' | 'trained' | 'failed' | 'archived';
}

export interface ModelTrainParams {
  hyperparameters?: ModelTrainParams.Hyperparameters;
}

export namespace ModelTrainParams {
  export interface Hyperparameters {
    batch_size?: number;

    early_stopping?: boolean;

    epochs?: number;

    learning_rate?: number;
  }
}

Models.Predictions = Predictions;

export declare namespace Models {
  export {
    type ModelCreateResponse as ModelCreateResponse,
    type ModelRetrieveResponse as ModelRetrieveResponse,
    type ModelListResponse as ModelListResponse,
    type ModelTrainResponse as ModelTrainResponse,
    type ModelCreateParams as ModelCreateParams,
    type ModelListParams as ModelListParams,
    type ModelTrainParams as ModelTrainParams,
  };

  export {
    Predictions as Predictions,
    type PredictionCreateResponse as PredictionCreateResponse,
    type PredictionCreateParams as PredictionCreateParams,
  };
}
