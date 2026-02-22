/**
 * Raw fetch adapter — reference implementation that works without any SDK.
 * Use this to verify the mock server works before testing generated SDKs.
 *
 * Usage: node test-runner.js raw-fetch
 */

export function createClient({ baseUrl, apiKey }) {
  async function request(method, path, { body, query, headers: extraHeaders } = {}) {
    // Strip leading slash so URL resolves relative to baseUrl path, not origin
    const relativePath = path.startsWith("/") ? path.slice(1) : path;
    const url = new URL(relativePath, baseUrl.endsWith("/") ? baseUrl : baseUrl + "/");
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
      }
    }

    const headers = {
      "X-Api-Key": apiKey,
      ...extraHeaders,
    };

    const fetchOpts = { method, headers };

    if (body instanceof FormData) {
      fetchOpts.body = body;
    } else if (body !== undefined) {
      headers["Content-Type"] = "application/json";
      fetchOpts.body = JSON.stringify(body);
    }

    const res = await fetch(url.toString(), fetchOpts);

    if (res.status === 204) return undefined;

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const err = new Error(errBody.message || `HTTP ${res.status}`);
      err.status = res.status;
      err.statusCode = res.status;
      err.body = errBody;
      err.error = errBody;
      throw err;
    }

    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/octet-stream")) {
      return res.arrayBuffer();
    }
    if (ct.includes("text/event-stream")) {
      return parseSSE(res);
    }
    return res.json();
  }

  async function* parseSSE(res) {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop(); // keep incomplete line

      let currentData = "";
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          currentData += line.slice(6);
        } else if (line === "" && currentData) {
          try {
            yield JSON.parse(currentData);
          } catch {}
          currentData = "";
        }
      }
    }
  }

  const get = (path, opts) => request("GET", path, opts);
  const post = (path, opts) => request("POST", path, opts);
  const patch = (path, opts) => request("PATCH", path, opts);
  const del = (path, opts) => request("DELETE", path, opts);

  return {
    organizations: {
      create: (body, opts) =>
        post("/organizations", { body, headers: opts?.headers }),
      get: (id) => get(`/organizations/${id}`),
      update: (id, body) => patch(`/organizations/${id}`, { body }),
      delete: (id) => del(`/organizations/${id}`),
      list: (params) => get("/organizations", { query: params }),
      listAutoPaginate: null, // not supported by raw fetch

      members: {
        create: (orgId, body) =>
          post(`/organizations/${orgId}/members`, { body }),
        list: (orgId, params) =>
          get(`/organizations/${orgId}/members`, { query: params }),
      },

      projects: {
        create: (orgId, body) =>
          post(`/organizations/${orgId}/projects`, { body }),
        get: (orgId, projectId) =>
          get(`/organizations/${orgId}/projects/${projectId}`),
        delete: (orgId, projectId) =>
          del(`/organizations/${orgId}/projects/${projectId}`),
        list: (orgId, params) =>
          get(`/organizations/${orgId}/projects`, { query: params }),

        datasets: {
          create: (orgId, projectId, body) =>
            post(
              `/organizations/${orgId}/projects/${projectId}/datasets`,
              { body }
            ),
          upload: async (orgId, projectId, { name, file }) => {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("file", file, name);
            return post(
              `/organizations/${orgId}/projects/${projectId}/datasets/upload`,
              { body: formData }
            );
          },
          list: (orgId, projectId, params) =>
            get(
              `/organizations/${orgId}/projects/${projectId}/datasets`,
              { query: params }
            ),
          get: (orgId, projectId, datasetId) =>
            get(
              `/organizations/${orgId}/projects/${projectId}/datasets/${datasetId}`
            ),
          download: (orgId, projectId, datasetId) =>
            get(
              `/organizations/${orgId}/projects/${projectId}/datasets/${datasetId}/download`
            ),
          delete: (orgId, projectId, datasetId) =>
            del(
              `/organizations/${orgId}/projects/${projectId}/datasets/${datasetId}`
            ),
        },

        models: {
          create: (orgId, projectId, body) =>
            post(
              `/organizations/${orgId}/projects/${projectId}/models`,
              { body }
            ),
          get: (orgId, projectId, modelId) =>
            get(
              `/organizations/${orgId}/projects/${projectId}/models/${modelId}`
            ),
          delete: (orgId, projectId, modelId) =>
            del(
              `/organizations/${orgId}/projects/${projectId}/models/${modelId}`
            ),
          list: (orgId, projectId, params) =>
            get(
              `/organizations/${orgId}/projects/${projectId}/models`,
              { query: params }
            ),
          train: (orgId, projectId, modelId, body) =>
            post(
              `/organizations/${orgId}/projects/${projectId}/models/${modelId}/train`,
              { body }
            ),
          predict: (orgId, projectId, modelId, body) =>
            post(
              `/organizations/${orgId}/projects/${projectId}/models/${modelId}/predict`,
              { body: { ...body, streaming: false } }
            ),
          predictStream: (orgId, projectId, modelId, body) =>
            request("POST",
              `/organizations/${orgId}/projects/${projectId}/models/${modelId}/predict`,
              {
                body: { ...body, streaming: true },
                headers: { Accept: "text/event-stream" },
              }
            ),
        },

        alerts: {
          create: (orgId, projectId, body) =>
            post(
              `/organizations/${orgId}/projects/${projectId}/alerts`,
              { body }
            ),
          get: (orgId, projectId, alertId) =>
            get(
              `/organizations/${orgId}/projects/${projectId}/alerts/${alertId}`
            ),
          update: (orgId, projectId, alertId, body) =>
            patch(
              `/organizations/${orgId}/projects/${projectId}/alerts/${alertId}`,
              { body }
            ),
          delete: (orgId, projectId, alertId) =>
            del(
              `/organizations/${orgId}/projects/${projectId}/alerts/${alertId}`
            ),
          list: (orgId, projectId, params) =>
            get(
              `/organizations/${orgId}/projects/${projectId}/alerts`,
              { query: params }
            ),
          listHistory: (orgId, projectId, alertId, params) =>
            get(
              `/organizations/${orgId}/projects/${projectId}/alerts/${alertId}/history`,
              { query: params }
            ),
        },

        predictions: {
          createBatch: (orgId, projectId, body) =>
            post(
              `/organizations/${orgId}/projects/${projectId}/predictions/batch`,
              { body }
            ),
        },
      },
    },

    operations: {
      get: (id) => get(`/operations/${id}`),
      cancel: (id) => post(`/operations/${id}/cancel`),
    },

    webhooks: {
      create: (body) => post("/webhooks", { body }),
      get: (id) => get(`/webhooks/${id}`),
      delete: (id) => del(`/webhooks/${id}`),
      list: (params) => get("/webhooks", { query: params }),
      listDeliveries: (id, params) =>
        get(`/webhooks/${id}/deliveries`, { query: params }),
      verify: (id, body) => post(`/webhooks/${id}/verify`, { body }),
    },
  };
}
