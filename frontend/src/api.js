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

// Upload an image through our own signed backend endpoint (server-side
// Cloudinary upload). Returns the hosted URL. Avoids needing an unsigned
// browser preset and keeps the Cloudinary secret on the server.
export function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = async () => {
      try {
        const data = await api('/api/admin/upload', {
          method: 'POST',
          body: JSON.stringify({ image: reader.result }),
        });
        resolve(data.url);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsDataURL(file);
  });
}

export function uploadVideo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = async () => {
      try {
        const data = await api('/api/admin/upload-video', {
          method: 'POST',
          body: JSON.stringify({ video: reader.result }),
        });
        resolve(data.url);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsDataURL(file);
  });
}

export default API_URL;
