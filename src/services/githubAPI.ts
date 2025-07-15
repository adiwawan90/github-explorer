import axios from 'axios';
import { User, Repository } from '../types';

const API_BASE_URL = 'https://api.github.com';

const githubAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    // Uncomment dan tambahkan token jika butuh rate limit lebih tinggi
    // Authorization: `token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`,
  },
});

export const searchUsers = async (query: string): Promise<User[]> => {
  if (!query) return [];
  const response = await githubAPI.get(`/search/users?q=${query}`);
  return response.data.items;
};

export const getUserRepos = async (username: string): Promise<Repository[]> => {
  const response = await githubAPI.get(`/users/${username}/repos?sort=updated&per_page=10`);
  return response.data;
};