export interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
}