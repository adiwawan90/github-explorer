import { Star } from 'lucide-react';
import { Repository } from '../types';

interface RepoCardProps {
  repo: Repository;
}

export const RepoCard = ({ repo }: RepoCardProps) => (
  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-200/50 rounded-md hover:bg-gray-200 transition-colors">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-gray-800">{repo.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{repo.description || 'No description'}</p>
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap">
        <span>{repo.stargazers_count}</span>
        <Star size={16} className="text-yellow-500" />
      </div>
    </div>
  </a>
);