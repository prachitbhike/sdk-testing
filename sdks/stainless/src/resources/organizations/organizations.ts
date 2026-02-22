// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as MembersAPI from './members';
import {
  MemberInviteParams,
  MemberInviteResponse,
  MemberListParams,
  MemberListResponse,
  Members,
} from './members';
import * as ProjectsAPI from './projects/projects';
import {
  ProjectCreateParams,
  ProjectCreateResponse,
  ProjectListParams,
  ProjectListResponse,
  ProjectRetrieveResponse,
  Projects,
} from './projects/projects';

export class Organizations extends APIResource {
  members: MembersAPI.Members = new MembersAPI.Members(this._client);
  projects: ProjectsAPI.Projects = new ProjectsAPI.Projects(this._client);

  /**
   * Create an organization
   */
  create(
    body: OrganizationCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<OrganizationCreateResponse> {
    return this._client.post('/organizations', { body, ...options });
  }

  /**
   * Retrieve an organization
   */
  retrieve(orgId: string, options?: Core.RequestOptions): Core.APIPromise<OrganizationRetrieveResponse> {
    return this._client.get(`/organizations/${orgId}`, options);
  }

  /**
   * Update an organization
   */
  update(
    orgId: string,
    body: OrganizationUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<OrganizationUpdateResponse> {
    return this._client.patch(`/organizations/${orgId}`, { body, ...options });
  }

  /**
   * List organizations
   */
  list(
    query?: OrganizationListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<OrganizationListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<OrganizationListResponse>;
  list(
    query: OrganizationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<OrganizationListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/organizations', { query, ...options });
  }

  /**
   * Delete an organization
   */
  delete(orgId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/organizations/${orgId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface OrganizationCreateResponse {
  id: string;

  created_at: string;

  name: string;

  plan: 'free' | 'pro' | 'enterprise';

  slug: string;

  metadata?: { [key: string]: string } | null;
}

export interface OrganizationRetrieveResponse {
  id: string;

  created_at: string;

  name: string;

  plan: 'free' | 'pro' | 'enterprise';

  slug: string;

  metadata?: { [key: string]: string } | null;
}

export interface OrganizationUpdateResponse {
  id: string;

  created_at: string;

  name: string;

  plan: 'free' | 'pro' | 'enterprise';

  slug: string;

  metadata?: { [key: string]: string } | null;
}

export interface OrganizationListResponse {
  data: Array<unknown>;

  has_more: boolean;

  next_cursor: string | null;
}

export interface OrganizationCreateParams {
  name: string;

  slug: string;

  metadata?: { [key: string]: string };

  plan?: 'free' | 'pro' | 'enterprise';
}

export interface OrganizationUpdateParams {
  metadata?: { [key: string]: string } | null;

  name?: string;

  plan?: 'free' | 'pro' | 'enterprise';
}

export interface OrganizationListParams {
  /**
   * Opaque cursor for cursor-based pagination.
   */
  cursor?: string;

  limit?: number;
}

Organizations.Members = Members;
Organizations.Projects = Projects;

export declare namespace Organizations {
  export {
    type OrganizationCreateResponse as OrganizationCreateResponse,
    type OrganizationRetrieveResponse as OrganizationRetrieveResponse,
    type OrganizationUpdateResponse as OrganizationUpdateResponse,
    type OrganizationListResponse as OrganizationListResponse,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationUpdateParams as OrganizationUpdateParams,
    type OrganizationListParams as OrganizationListParams,
  };

  export {
    Members as Members,
    type MemberListResponse as MemberListResponse,
    type MemberInviteResponse as MemberInviteResponse,
    type MemberListParams as MemberListParams,
    type MemberInviteParams as MemberInviteParams,
  };

  export {
    Projects as Projects,
    type ProjectCreateResponse as ProjectCreateResponse,
    type ProjectRetrieveResponse as ProjectRetrieveResponse,
    type ProjectListResponse as ProjectListResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectListParams as ProjectListParams,
  };
}
