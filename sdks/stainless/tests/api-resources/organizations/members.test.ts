// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Wndrco from 'chronocast';
import { Response } from 'node-fetch';

const client = new Wndrco({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource members', () => {
  test('list', async () => {
    const responsePromise = client.organizations.members.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.organizations.members.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Wndrco.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.organizations.members.list(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          cursor: 'cursor',
          limit: 1,
          role: 'owner',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Wndrco.NotFoundError);
  });

  test('invite: only required params', async () => {
    const responsePromise = client.organizations.members.invite('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      email: 'dev@stainless.com',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('invite: required and optional params', async () => {
    const response = await client.organizations.members.invite('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      email: 'dev@stainless.com',
      role: 'admin',
    });
  });
});
