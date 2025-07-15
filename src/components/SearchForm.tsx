import { Search } from 'lucide-react';

interface SearchFormProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchForm = ({ searchTerm, setSearchTerm, onSearch, isLoading }: SearchFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter username"
          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading || !searchTerm}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Searching...' : <><Search size={16} /> Search</>}
        </button>
      </div>
    </form>
  );
};