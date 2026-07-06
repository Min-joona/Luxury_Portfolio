const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function api(endpoint, options = {}) {
  const token = localStorage.getItem('adminToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // An expired/invalid admin session: clear the bad token and return to
    // the login page instead of trapping the user on an error screen.
    if ((response.status === 401 || response.status === 403) && token) {
      localStorage.removeItem('adminToken');
      if (typeof window !== 'undefined' && !window.location.pathname.endsWith('/admin/login')) {
        window.location.assign('/admin/login');
      }
    }
    const err = new Error(data.error || `HTTP ${response.status}`);
    err.status = response.status;
    throw err;
  }

  return data;
}

export default API_URL;
