// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Wndrco } from './index';

export abstract class APIResource {
  protected _client: Wndrco;

  constructor(client: Wndrco) {
    this._client = client;
  }
}
