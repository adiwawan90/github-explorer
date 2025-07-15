import { useState } from "react";
import { GitHubUser } from "../types";
import { githubAPI } from "../services/githubAPI";

const useGetUsers = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (query: string) => {
    setError(null);
    setUsers([]);
    if (!query) return;

    try {
      setLoadingUsers(true);
      const response = await githubAPI.get(`/search/users?q=${query}&per_page=5`);
      setUsers(response.data.items || []);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  return {
    loadingUsers,
    users,
    error,
    fetchUsers,
    setUsers,
  }
}

export default useGetUsers;