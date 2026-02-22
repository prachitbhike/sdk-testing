// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import { type Response } from '../../../_shims/index';

export class Datasets extends APIResource {
  /**
   * Create a dataset (metadata only, for API pull or webhook sources)
   */
  create(
    orgId: string,
    projectId: string,
    body: DatasetCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DatasetCreateResponse> {
    return this._client.post(`/organizations/${orgId}/projects/${projectId}/datasets`, { body, ...options });
  }

  /**
   * Retrieve a dataset
   */
  retrieve(
    orgId: string,
    projectId: string,
    datasetId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DatasetRetrieveResponse> {
    return this._client.get(`/organizations/${orgId}/projects/${projectId}/datasets/${datasetId}`, options);
  }

  /**
   * List datasets in a project
   */
  list(
    orgId: string,
    projectId: string,
    query?: DatasetListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DatasetListResponse>;
  list(orgId: string, projectId: string, options?: Core.RequestOptions): Core.APIPromise<DatasetListResponse>;
  list(
    orgId: string,
    projectId: string,
    query: DatasetListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<DatasetListResponse> {
    if (isRequestOptions(query)) {
      return this.list(orgId, projectId, {}, query);
    }
    return this._client.get(`/organizations/${orgId}/projects/${projectId}/datasets`, { query, ...options });
  }

  /**
   * Delete a dataset
   */
  delete(
    orgId: string,
    projectId: string,
    datasetId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.delete(`/organizations/${orgId}/projects/${projectId}/datasets/${datasetId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Download the raw dataset file
   */
  download(
    orgId: string,
    projectId: string,
    datasetId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Response> {
    return this._client.get(`/organizations/${orgId}/projects/${projectId}/datasets/${datasetId}/download`, {
      ...options,
      headers: { Accept: 'application/octet-stream', ...options?.headers },
      __binaryResponse: true,
    });
  }

  /**
   * Upload a dataset file (CSV, Parquet, or JSON)
   */
  upload(
    orgId: string,
    projectId: string,
    body: DatasetUploadParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DatasetUploadResponse> {
    return this._client.post(
      `/organizations/${orgId}/projects/${projectId}/datasets/upload`,
      Core.multipartFormRequestOptions({ body, ...options }),
    );
  }
}

export interface DatasetCreateResponse {
  id: string;

  created_at: string;

  format: 'csv' | 'parquet' | 'json';

  name: string;

  project_id: string;

  size_bytes: number;

  source:
    | DatasetCreateResponse.FileUploadSource
    | DatasetCreateResponse.WebhookIngestSource
    | DatasetCreateResponse.APIPullSource;

  status: 'uploading' | 'processing' | 'ready' | 'failed';

  columns?: Array<DatasetCreateResponse.Column> | null;

  row_count?: number | null;
}

export namespace DatasetCreateResponse {
  export interface FileUploadSource {
    content_type: string;

    filename: string;

    type: 'file_upload';
  }

  export interface WebhookIngestSource {
    endpoint_url: string;

    secret: string;

    type: 'webhook_ingest';
  }

  export interface APIPullSource {
    schedule_cron: string;

    source_url: string;

    type: 'api_pull';

    headers?: { [key: string]: string };
  }

  export interface Column {
    dtype: 'float64' | 'int64' | 'string' | 'datetime' | 'boolean';

    name: string;

    nullable: boolean;
  }
}

export interface DatasetRetrieveResponse {
  id: string;

  created_at: string;

  format: 'csv' | 'parquet' | 'json';

  name: string;

  project_id: string;

  size_bytes: number;

  source:
    | DatasetRetrieveResponse.FileUploadSource
    | DatasetRetrieveResponse.WebhookIngestSource
    | DatasetRetrieveResponse.APIPullSource;

  status: 'uploading' | 'processing' | 'ready' | 'failed';

  columns?: Array<DatasetRetrieveResponse.Column> | null;

  row_count?: number | null;
}

export namespace DatasetRetrieveResponse {
  export interface FileUploadSource {
    content_type: string;

    filename: string;

    type: 'file_upload';
  }

  export interface WebhookIngestSource {
    endpoint_url: string;

    secret: string;

    type: 'webhook_ingest';
  }

  export interface APIPullSource {
    schedule_cron: string;

    source_url: string;

    type: 'api_pull';

    headers?: { [key: string]: string };
  }

  export interface Column {
    dtype: 'float64' | 'int64' | 'string' | 'datetime' | 'boolean';

    name: string;

    nullable: boolean;
  }
}

export interface DatasetListResponse {
  data: Array<unknown>;

  has_more: boolean;

  next_cursor: string | null;
}

export interface DatasetUploadResponse {
  id: string;

  created_at: string;

  format: 'csv' | 'parquet' | 'json';

  name: string;

  project_id: string;

  size_bytes: number;

  source:
    | DatasetUploadResponse.FileUploadSource
    | DatasetUploadResponse.WebhookIngestSource
    | DatasetUploadResponse.APIPullSource;

  status: 'uploading' | 'processing' | 'ready' | 'failed';

  columns?: Array<DatasetUploadResponse.Column> | null;

  row_count?: number | null;
}

export namespace DatasetUploadResponse {
  export interface FileUploadSource {
    content_type: string;

    filename: string;

    type: 'file_upload';
  }

  export interface WebhookIngestSource {
    endpoint_url: string;

    secret: string;

    type: 'webhook_ingest';
  }

  export interface APIPullSource {
    schedule_cron: string;

    source_url: string;

    type: 'api_pull';

    headers?: { [key: string]: string };
  }

  export interface Column {
    dtype: 'float64' | 'int64' | 'string' | 'datetime' | 'boolean';

    name: string;

    nullable: boolean;
  }
}

export interface DatasetCreateParams {
  name: string;

  source:
    | DatasetCreateParams.FileUploadSource
    | DatasetCreateParams.WebhookIngestSource
    | DatasetCreateParams.APIPullSource;
}

export namespace DatasetCreateParams {
  export interface FileUploadSource {
    content_type: string;

    filename: string;

    type: 'file_upload';
  }

  export interface WebhookIngestSource {
    endpoint_url: string;

    secret: string;

    type: 'webhook_ingest';
  }

  export interface APIPullSource {
    schedule_cron: string;

    source_url: string;

    type: 'api_pull';

    headers?: { [key: string]: string };
  }
}

export interface DatasetListParams {
  /**
   * Opaque cursor for cursor-based pagination.
   */
  cursor?: string;

  limit?: number;

  status?: 'uploading' | 'processing' | 'ready' | 'failed';
}

export interface DatasetUploadParams {
  /**
   * The dataset file (CSV, Parquet, or JSON)
   */
  file: Core.Uploadable;

  name: string;
}

export declare namespace Datasets {
  export {
    type DatasetCreateResponse as DatasetCreateResponse,
    type DatasetRetrieveResponse as DatasetRetrieveResponse,
    type DatasetListResponse as DatasetListResponse,
    type DatasetUploadResponse as DatasetUploadResponse,
    type DatasetCreateParams as DatasetCreateParams,
    type DatasetListParams as DatasetListParams,
    type DatasetUploadParams as DatasetUploadParams,
  };
}
