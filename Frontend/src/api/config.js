let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5237/api';

// Professional auto-fix for missing /api suffix
if (baseUrl && !baseUrl.endsWith('/api')) {
  baseUrl = baseUrl.endsWith('/') ? `${baseUrl}api` : `${baseUrl}/api`;
}

const API_URL = baseUrl;
export default API_URL;
