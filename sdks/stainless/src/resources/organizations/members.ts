// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class Members extends APIResource {
  /**
   * List organization members
   */
  list(
    orgId: string,
    query?: MemberListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MemberListResponse>;
  list(orgId: string, options?: Core.RequestOptions): Core.APIPromise<MemberListResponse>;
  list(
    orgId: string,
    query: MemberListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<MemberListResponse> {
    if (isRequestOptions(query)) {
      return this.list(orgId, {}, query);
    }
    return this._client.get(`/organizations/${orgId}/members`, { query, ...options });
  }

  /**
   * Invite a member to the organization
   */
  invite(
    orgId: string,
    body: MemberInviteParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MemberInviteResponse> {
    return this._client.post(`/organizations/${orgId}/members`, { body, ...options });
  }
}

export interface MemberListResponse {
  data: Array<unknown>;

  has_more: boolean;

  next_cursor: string | null;
}

export interface MemberInviteResponse {
  id: string;

  email: string;

  joined_at: string;

  org_id: string;

  role: 'owner' | 'admin' | 'member' | 'viewer';
}

export interface MemberListParams {
  /**
   * Opaque cursor for cursor-based pagination.
   */
  cursor?: string;

  limit?: number;

  role?: 'owner' | 'admin' | 'member' | 'viewer';
}

export interface MemberInviteParams {
  email: string;

  role?: 'admin' | 'member' | 'viewer';
}

export declare namespace Members {
  export {
    type MemberListResponse as MemberListResponse,
    type MemberInviteResponse as MemberInviteResponse,
    type MemberListParams as MemberListParams,
    type MemberInviteParams as MemberInviteParams,
  };
}
