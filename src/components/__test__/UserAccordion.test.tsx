import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserAccordion } from '../UserAccordion';
import useGetUserRepos from '../../hooks/useGetUserRepos';
import { GitHubUser, GitHubRepo } from '../../types';

jest.mock('../../hooks/useGetUserRepos');

jest.mock('../RepoCard', () => ({
  RepoCard: ({ repo }: { repo: GitHubRepo }) => <div>{repo.name}</div>,
}));
jest.mock('lucide-react', () => ({
  ...jest.requireActual('lucide-react'),
  Loader2: () => <div data-testid="loader" />,
}));

const mockedUseGetUserRepos = useGetUserRepos as jest.Mock;

describe('UserAccordion', () => {
  const mockUser: GitHubUser = {
    id: 1,
    login: 'testuser',
    avatar_url: '',
    html_url: '',
  };
  const mockRepos: GitHubRepo[] = [{ id: 101, name: 'Cool Repo', description: '', stargazers_count: 5, html_url: '' }];
  const mockFetchRepos = jest.fn();

  beforeEach(() => {

    jest.clearAllMocks();
  });

  it('should render the user login and be closed initially', () => {
    mockedUseGetUserRepos.mockReturnValue({
      repos: [],
      loadingRepos: false,
      error: null,
      fetchRepos: mockFetchRepos,
    });

    render(<UserAccordion user={mockUser} />);

    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(mockFetchRepos).not.toHaveBeenCalled();
  });

  it('should show loader and fetch repos when opened', async () => {
    mockedUseGetUserRepos.mockReturnValue({
      repos: [],
      loadingRepos: true,
      error: null,
      fetchRepos: mockFetchRepos,
    });

    render(<UserAccordion user={mockUser} />);
    const accordionButton = screen.getByRole('button', { name: 'testuser' });

    fireEvent.click(accordionButton);

    await waitFor(() => {
      expect(mockFetchRepos).toHaveBeenCalledWith('testuser');
    });
  });

  it('should display repositories when fetch is successful', async () => {
    mockedUseGetUserRepos.mockReturnValue({
      repos: mockRepos,
      loadingRepos: false,
      error: null,
      fetchRepos: mockFetchRepos,
    });

    render(<UserAccordion user={mockUser} />);
    const accordionButton = screen.getByRole('button', { name: 'testuser' });

    fireEvent.click(accordionButton);

    await waitFor(() => {
      expect(screen.getByText('Cool Repo')).toBeInTheDocument();
    });
  });

  it('should display "no repositories" message when result is empty', async () => {
    mockedUseGetUserRepos.mockReturnValue({
      repos: [],
      loadingRepos: false,
      error: null,
      fetchRepos: mockFetchRepos,
    });

    render(<UserAccordion user={mockUser} />);
    const accordionButton = screen.getByRole('button', { name: 'testuser' });

    fireEvent.click(accordionButton);

    await waitFor(() => {
      expect(screen.getByText('This user has no public repositories.')).toBeInTheDocument();
    });
  });

  it('should display an error message on fetch failure', async () => {
    const errorMessage = 'Failed to fetch';
    mockedUseGetUserRepos.mockReturnValue({
      repos: [],
      loadingRepos: false,
      error: errorMessage,
      fetchRepos: mockFetchRepos,
    });

    render(<UserAccordion user={mockUser} />);
    const accordionButton = screen.getByRole('button', { name: 'testuser' });

    fireEvent.click(accordionButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});