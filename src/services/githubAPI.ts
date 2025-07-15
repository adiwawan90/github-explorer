import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

export const githubAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    // Uncomment dan tambahkan token jika butuh rate limit lebih tinggi
    // Authorization: `token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`,
  },
});
