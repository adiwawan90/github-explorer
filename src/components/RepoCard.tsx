import { Star } from 'lucide-react';
import { GitHubRepo } from '../types';

interface RepoCardProps {
  repo: GitHubRepo;
}

export const RepoCard = ({ repo }: RepoCardProps) => (
  <div className="bg-gray-200 p-4 rounded-sm mb-2 flex justify-between items-start">
    <div className="flex-1">
      <h3 className="font-bold text-gray-900 mb-1">{repo?.name}</h3>
      <p className="text-gray-600 text-sm">{repo?.description ?? "-"}</p>
    </div>
    <div className="flex items-center ml-4">
      <span className="text-gray-900 font-semibold mr-2">{repo?.stargazers_count}</span>
      <Star className="w-4 h-4 text-gray-600 fill-gray-600" />
    </div>
  </div>
);