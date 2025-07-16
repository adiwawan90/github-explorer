import { renderHook, act } from '@testing-library/react';
import useGetUsers from '../useGetUsers';
import { githubAPI } from '../../services/githubAPI';
import { GitHubUser } from '../../types';

jest.mock('../../services/githubAPI', () => ({
  githubAPI: {
    get: jest.fn(),
  },
}));

const mockedGithubAPI = githubAPI as jest.Mocked<typeof githubAPI>;

describe('useGetUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useGetUsers());

    expect(result.current.users).toEqual([]);
    expect(result.current.loadingUsers).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch and set users successfully', async () => {
    const mockUsers: GitHubUser[] = [{
      id: 1, login: 'user-1',
      avatar_url: '',
      html_url: ''
    }];
    mockedGithubAPI.get.mockResolvedValue({ data: { items: mockUsers } });
    const { result } = renderHook(() => useGetUsers());
    const query = 'react';

    await act(async () => {
      await result.current.fetchUsers(query);
    });

    expect(mockedGithubAPI.get).toHaveBeenCalledWith(`/search/users?q=${query}&per_page=5`);
    expect(result.current.loadingUsers).toBe(false);
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors correctly', async () => {
    mockedGithubAPI.get.mockRejectedValue(new Error('API Error'));
    const { result } = renderHook(() => useGetUsers());
    const query = 'react';

    await act(async () => {
      await result.current.fetchUsers(query);
    });

    expect(mockedGithubAPI.get).toHaveBeenCalledWith(`/search/users?q=${query}&per_page=5`);
    expect(result.current.loadingUsers).toBe(false);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch users.');
  });

  it('should not call the API if the query is empty', async () => {
    const { result } = renderHook(() => useGetUsers());

    await act(async () => {
      await result.current.fetchUsers('');
    });

    expect(mockedGithubAPI.get).not.toHaveBeenCalled();
    expect(result.current.loadingUsers).toBe(false);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});