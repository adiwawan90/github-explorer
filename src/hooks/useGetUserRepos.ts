import { useState } from "react";
import { GitHubRepo } from "../types";
import { githubAPI } from "../services/githubAPI";

const useGetUserRepos = () => {
  const [error, setError] = useState<string | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);

  const fetchRepos = async (username: string) => {
    setLoadingRepos(true);
    setRepos([]);
    try {
      const response = await githubAPI.get(`/users/${username}/repos`);
      setRepos(response.data || []);
    } catch (err) {
      setError("Failed to fetch repositories.");
    } finally {
      setLoadingRepos(false);
    }
  };

  return {
    loadingRepos,
    repos,
    error,
    fetchRepos
  }
}

export default useGetUserRepos;