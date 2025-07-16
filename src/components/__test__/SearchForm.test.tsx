import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchForm } from '../SearchForm';

jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
}));

describe('SearchForm', () => {
  const defaultProps = {
    searchTerm: '',
    setSearchTerm: jest.fn(),
    onSearch: jest.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call setSearchTerm when user types in the input', () => {
    render(<SearchForm {...defaultProps} />);
    const input = screen.getByPlaceholderText(/enter username/i);

    fireEvent.change(input, { target: { value: 'react' } });

    expect(defaultProps.setSearchTerm).toHaveBeenCalledWith('react');
    expect(defaultProps.setSearchTerm).toHaveBeenCalledTimes(1);
  });

  it('should call onSearch when the form is submitted', () => {
    render(<SearchForm {...defaultProps} searchTerm="react" />);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalledTimes(1);
  });

  it('should disable the button when searchTerm is empty', () => {
    render(<SearchForm {...defaultProps} searchTerm="" />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should disable the button when isLoading is true', () => {
    render(<SearchForm {...defaultProps} searchTerm="react" isLoading={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should display "Searching..." text and no icon when isLoading is true', () => {
    render(<SearchForm {...defaultProps} isLoading={true} />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Searching...');
    expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument();
  });
});