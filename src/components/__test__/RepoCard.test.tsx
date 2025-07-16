import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RepoCard } from '../RepoCard';
import { GitHubRepo } from '../../types';

jest.mock('lucide-react', () => ({
  Star: () => <div data-testid="star-icon" />,
}));

describe('RepoCard', () => {
  const mockRepo: GitHubRepo = {
    id: 123,
    name: 'My Awesome Project',
    description: 'A project to demonstrate testing.',
    stargazers_count: 42,
    html_url: ''
  };

  test('should render repository details correctly', () => {
    render(<RepoCard repo={mockRepo} />);

    expect(screen.getByText('My Awesome Project')).toBeInTheDocument();
    expect(screen.getByText('A project to demonstrate testing.')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
  });

  test('should render a hyphen for the description if it is null or undefined', () => {
    const repoWithNoDescription: GitHubRepo = {
      ...mockRepo,
      description: null,
    };

    render(<RepoCard repo={repoWithNoDescription} />);

    expect(screen.getByText('-')).toBeInTheDocument();
  });
});