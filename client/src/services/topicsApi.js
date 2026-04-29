const API_BASE = '/api/topics';

async function request(path = '', options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(errorPayload.message || 'Request failed.');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const topicsApi = {
  getTopics() {
    return request();
  },
  getTopic(id) {
    return request(`/${id}`);
  },
  createTopic(payload) {
    return request('', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  updateTopic(id, payload) {
    return request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },
  deleteTopic(id) {
    return request(`/${id}`, {
      method: 'DELETE',
    });
  },
};
