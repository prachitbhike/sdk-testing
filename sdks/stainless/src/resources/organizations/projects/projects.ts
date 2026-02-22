// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as AlertsAPI from './alerts';
import {
  AlertCreateParams,
  AlertCreateResponse,
  AlertListHistoryParams,
  AlertListHistoryResponse,
  AlertListParams,
  AlertListResponse,
  AlertRetrieveResponse,
  AlertUpdateParams,
  AlertUpdateResponse,
  Alerts,
} from './alerts';
import * as DatasetsAPI from './datasets';
import {
  DatasetCreateParams,
  DatasetCreateResponse,
  DatasetListParams,
  DatasetListResponse,
  DatasetRetrieveResponse,
  DatasetUploadParams,
  DatasetUploadResponse,
  Datasets,
} from './datasets';
import * as PredictionsAPI from './predictions';
import { PredictionCreateBatchParams, PredictionCreateBatchResponse, Predictions } from './predictions';
import * as ModelsAPI from './models/models';
import {
  ModelCreateParams,
  ModelCreateResponse,
  ModelListParams,
  ModelListResponse,
  ModelRetrieveResponse,
  ModelTrainParams,
  ModelTrainResponse,
  Models,
} from './models/models';

export class Projects extends APIResource {
  datasets: DatasetsAPI.Datasets = new DatasetsAPI.Datasets(this._client);
  models: ModelsAPI.Models = new ModelsAPI.Models(this._client);
  predictions: PredictionsAPI.Predictions = new PredictionsAPI.Predictions(this._client);
  alerts: AlertsAPI.Alerts = new AlertsAPI.Alerts(this._client);

  /**
   * Create a project
   */
  create(
    orgId: string,
    body: ProjectCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProjectCreateResponse> {
    return this._client.post(`/organizations/${orgId}/projects`, { body, ...options });
  }

  /**
   * Retrieve a project
   */
  retrieve(
    orgId: string,
    projectId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProjectRetrieveResponse> {
    return this._client.get(`/organizations/${orgId}/projects/${projectId}`, options);
  }

  /**
   * List projects in an organization
   */
  list(
    orgId: string,
    query?: ProjectListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProjectListResponse>;
  list(orgId: string, options?: Core.RequestOptions): Core.APIPromise<ProjectListResponse>;
  list(
    orgId: string,
    query: ProjectListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProjectListResponse> {
    if (isRequestOptions(query)) {
      return this.list(orgId, {}, query);
    }
    return this._client.get(`/organizations/${orgId}/projects`, { query, ...options });
  }

  /**
   * Delete a project
   */
  delete(orgId: string, projectId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/organizations/${orgId}/projects/${projectId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ProjectCreateResponse {
  id: string;

  created_at: string;

  name: string;

  org_id: string;

  updated_at: string;

  description?: string | null;
}

export interface ProjectRetrieveResponse {
  id: string;

  created_at: string;

  name: string;

  org_id: string;

  updated_at: string;

  description?: string | null;
}

export interface ProjectListResponse {
  data: Array<unknown>;

  has_more: boolean;

  next_cursor: string | null;
}

export interface ProjectCreateParams {
  name: string;

  description?: string | null;
}

export interface ProjectListParams {
  /**
   * Opaque cursor for cursor-based pagination.
   */
  cursor?: string;

  limit?: number;
}

Projects.Datasets = Datasets;
Projects.Models = Models;
Projects.Predictions = Predictions;
Projects.Alerts = Alerts;

export declare namespace Projects {
  export {
    type ProjectCreateResponse as ProjectCreateResponse,
    type ProjectRetrieveResponse as ProjectRetrieveResponse,
    type ProjectListResponse as ProjectListResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectListParams as ProjectListParams,
  };

  export {
    Datasets as Datasets,
    type DatasetCreateResponse as DatasetCreateResponse,
    type DatasetRetrieveResponse as DatasetRetrieveResponse,
    type DatasetListResponse as DatasetListResponse,
    type DatasetUploadResponse as DatasetUploadResponse,
    type DatasetCreateParams as DatasetCreateParams,
    type DatasetListParams as DatasetListParams,
    type DatasetUploadParams as DatasetUploadParams,
  };

  export {
    Models as Models,
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
    type PredictionCreateBatchResponse as PredictionCreateBatchResponse,
    type PredictionCreateBatchParams as PredictionCreateBatchParams,
  };

  export {
    Alerts as Alerts,
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
