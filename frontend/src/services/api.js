
const BASE_URL = '/api';

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = 'An error occurred';
        try {
            const errorData = await response.json();
            // Handle Django REST Framework error formats
            if (errorData.detail) {
                errorMessage = errorData.detail;
            } else if (typeof errorData === 'object') {
                // Join all error messages from all fields
                errorMessage = Object.entries(errorData)
                    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(' ') : value}`)
                    .join('\n');
            }
        } catch (e) {
            errorMessage = `Request failed: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
    }
    // For 204 No Content
    if (response.status === 204) return null;
    return response.json();
};

export const api = {
    get: (url) => fetch(`${BASE_URL}${url}`, { headers: getHeaders() }).then(handleResponse),

    post: (url, body) => fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body),
    }).then(handleResponse),

    postFormData: (url, formData) => {
        const headers = getHeaders();
        delete headers['Content-Type']; // Let browser set boundary for FormData
        return fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers,
            body: formData,
        }).then(handleResponse);
    },

    put: (url, body) => fetch(`${BASE_URL}${url}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body),
    }).then(handleResponse),

    delete: (url) => fetch(`${BASE_URL}${url}`, {
        method: 'DELETE',
        headers: getHeaders(),
    }).then(handleResponse),
};
