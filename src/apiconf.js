let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === 'theupvote.netlify.com') {
  backendHost = 'http://127.0.0.1:8000';
} else if(hostname === 'localhost:3000') {
  backendHost = 'http://127.0.0.1:8000';
}
else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8000';
}

export const API_ROOT = `${backendHost}`;
