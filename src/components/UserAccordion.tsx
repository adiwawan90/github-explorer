import { useState } from 'react';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { User, Repository } from '../types';
import { getUserRepos } from '../services/githubAPI';
import { RepoCard } from './RepoCard';

interface UserAccordionProps {
  user: User;
}

export const UserAccordion = ({ user }: UserAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleAccordion = async () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    if (repos.length > 0) return;

    setIsLoading(true);
    setError(null);
    try {
      const userRepos = await getUserRepos(user.login);
      setRepos(userRepos);
    } catch (err) {
      setError('Failed to fetch repositories.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >
        <span className="font-medium">{user.login}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          {isLoading && <div className="flex justify-center items-center p-4"><Loader2 className="animate-spin" /></div>}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading && !error && (
            <div className="flex flex-col gap-3">
              {repos.length > 0 ? (
                repos.map(repo => <RepoCard key={repo.id} repo={repo} />)
              ) : (
                <p className="text-gray-500">This user has no public repositories.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};