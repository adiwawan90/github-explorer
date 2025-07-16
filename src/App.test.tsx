/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import useGetUsers from './hooks/useGetUsers';
import { GitHubUser } from './types';

jest.mock('./hooks/useDebounce', () => (value: any) => value);
jest.mock('./hooks/useGetUsers');
const mockedUseGetUsers = useGetUsers as jest.Mock;

jest.mock('./components/SearchForm', () => ({
  SearchForm: ({ searchTerm, setSearchTerm, onSearch }: any) => (
    <div>
      <input
        data-testid="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button data-testid="search-button" onClick={onSearch}>Search</button>
    </div>
  )
}));
jest.mock('./components/UserAccordion', () => ({
  UserAccordion: ({ user }: { user: GitHubUser }) => <div data-testid="user-item">{user.login}</div>
}));

describe('App Component', () => {
  const mockFetchUsers = jest.fn();
  const mockSetUsers = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseGetUsers.mockReturnValue({
      loadingUsers: false,
      error: null,
      users: [],
      fetchUsers: mockFetchUsers,
      setUsers: mockSetUsers,
    });
  });

  it('should render the initial UI correctly', () => {
    render(<App />);
    expect(screen.getByText(/GitHub Repositories Explorer/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('should perform a search and display users successfully', async () => {
    const mockUsers: GitHubUser[] = [{
      id: 1, login: 'testuser1',
      avatar_url: '',
      html_url: ''
    }];
    mockedUseGetUsers.mockReturnValue({
      loadingUsers: false,
      error: null,
      users: mockUsers,
      fetchUsers: mockFetchUsers,
      setUsers: mockSetUsers,
    });

    render(<App />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'test' } });

    const button = screen.getByTestId('search-button');
    fireEvent.click(button);

    // Kita gunakan waitFor untuk menunggu assertion yang hasilnya async
    await waitFor(() => {
      expect(mockFetchUsers).toHaveBeenCalledWith('test');
      expect(screen.getByText('Showing users for "test"')).toBeInTheDocument();
      expect(screen.getByText('testuser1')).toBeInTheDocument();
    });
  });

  it('should display a "no users found" message for an empty result', async () => {
    render(<App />);

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'nouser' } });
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(mockFetchUsers).toHaveBeenCalledWith('nouser');
      expect(screen.getByText(/no users found/i)).toBeInTheDocument();
    });
  });

  it('should display an error message when the fetch fails', async () => {
    const errorMessage = 'Failed to fetch';
    mockedUseGetUsers.mockReturnValue({
      loadingUsers: false,
      error: errorMessage,
      users: [],
      fetchUsers: mockFetchUsers,
      setUsers: mockSetUsers,
    });

    render(<App />);

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'error' } });
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should clear results when search term is cleared', async () => {
    render(<App />);

    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: '' } });

    await waitFor(() => {
      expect(mockSetUsers).toHaveBeenCalledWith([]);
      expect(screen.queryByText(/Showing users for/i)).not.toBeInTheDocument();
    });
  });
});