import { renderHook, act } from '@testing-library/react';
import useGetUserRepos from '../useGetUserRepos';
import { githubAPI } from '../../services/githubAPI';
import { GitHubRepo } from '../../types';

jest.mock('../../services/githubAPI', () => ({
  githubAPI: {
    get: jest.fn(),
  },
}));

const mockedGithubAPI = githubAPI as jest.Mocked<typeof githubAPI>;

describe('useGetUserRepos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return correct initial state', () => {
    const { result } = renderHook(() => useGetUserRepos());

    expect(result.current.repos).toEqual([]);
    expect(result.current.loadingRepos).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch and set repos successfully', async () => {
    const mockRepos: GitHubRepo[] = [{
      id: 1, name: 'repo-1',
      description: null,
      stargazers_count: 0,
      html_url: ''
    }, {
      id: 2, name: 'repo-2',
      description: null,
      stargazers_count: 0,
      html_url: ''
    }];
    mockedGithubAPI.get.mockResolvedValue({ data: mockRepos });
    const { result } = renderHook(() => useGetUserRepos());

    await act(async () => {
      await result.current.fetchRepos('testuser');
    });

    expect(mockedGithubAPI.get).toHaveBeenCalledWith('/users/testuser/repos');
    expect(result.current.loadingRepos).toBe(false);
    expect(result.current.repos).toEqual(mockRepos);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors correctly', async () => {
    mockedGithubAPI.get.mockRejectedValue(new Error('Network Error'));
    const { result } = renderHook(() => useGetUserRepos());

    await act(async () => {
      await result.current.fetchRepos('testuser');
    });

    expect(mockedGithubAPI.get).toHaveBeenCalledWith('/users/testuser/repos');
    expect(result.current.loadingRepos).toBe(false);
    expect(result.current.repos).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch repositories.');
  });
});