// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Wndrco from 'chronocast';
import { Response } from 'node-fetch';

const client = new Wndrco({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource predictions', () => {
  test('createBatch: only required params', async () => {
    const responsePromise = client.organizations.projects.predictions.createBatch(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { requests: [{ horizon: 1, model_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }] },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createBatch: required and optional params', async () => {
    const response = await client.organizations.projects.predictions.createBatch(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      {
        requests: [
          {
            horizon: 1,
            model_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            confidence_intervals: [0],
            input_overrides: { foo: 0 },
            streaming: true,
          },
        ],
      },
    );
  });
});
