import { useCallback, useEffect, useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { UserAccordion } from './components/UserAccordion';
import useGetUsers from './hooks/useGetUsers';
import useDebounce from './hooks/useDebounce';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Delay 500ms
  const { loadingUsers: isLoading, error, users, fetchUsers, setUsers } = useGetUsers();

  const handleSearch = useCallback(() => {
    if (!debouncedSearchTerm) {
      setUsers([]);
      return;
    };
    setSearchedTerm(debouncedSearchTerm);
    fetchUsers(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchUsers, setUsers]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setUsers([]);
      setSearchedTerm("");
    };
  }, [debouncedSearchTerm, setUsers])

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4 sm:p-6 lg:p-8 !bg-white">
      <main className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">GitHub Repositories <br /> Explorer</h1>

        <div className="rounded-lg">
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-6">
          {searchedTerm && !isLoading && (
            <p className="text-gray-600 mb-4">
              Showing users for "{searchedTerm}"
            </p>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
              <strong className="font-bold">Error: </strong>
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {!isLoading && users.length > 0 && users.map(user => (
              <UserAccordion key={user.id} user={user} />
            ))}
            {!isLoading && users.length === 0 && searchedTerm && !error && (
              <p className="text-center text-gray-500 mt-8">No users found.</p>
            )}
          </div>
        </div>
      </main>
    </div >
  );
}

export default App;