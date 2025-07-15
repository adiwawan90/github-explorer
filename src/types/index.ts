export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
}