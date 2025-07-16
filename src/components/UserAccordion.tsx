import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { GitHubUser } from '../types';
import { RepoCard } from './RepoCard';
import useGetUserRepos from '../hooks/useGetUserRepos';
import Accordion from './Accordion';

interface UserAccordionProps {
  user: GitHubUser;
}

export const UserAccordion = ({ user }: UserAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { repos, loadingRepos, error, fetchRepos } = useGetUserRepos();

  const toggleAccordion = async () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      fetchRepos(user.login);
    }
  }, [isOpen, user.login])

  return (
    <Accordion title={user.login} onToggleClicked={toggleAccordion} isOpen={isOpen}>
      {isOpen && (
        <div className="bg-white w-[97%] justify-self-end pt-4">
          {loadingRepos && <div className="flex justify-center items-center p-4"><Loader2 className="animate-spin" /></div>}
          {error && <p className="text-red-500">{error}</p>}
          {!loadingRepos && !error && (
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
    </Accordion>
  );
};