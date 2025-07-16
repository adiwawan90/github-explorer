import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from '../Accordion';

jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down" />,
  ChevronUp: () => <div data-testid="chevron-up" />,
}));

describe('Accordion', () => {
  const mockTitle = 'Test Accordion Title';
  const mockChildren = <div>Accordion Content</div>;

  it('should render correctly when closed', () => {
    const onToggleMock = jest.fn();
    render(
      <Accordion title={mockTitle} isOpen={false} onToggleClicked={onToggleMock}>
        {mockChildren}
      </Accordion>
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText('Accordion Content')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    expect(screen.queryByTestId('chevron-up')).not.toBeInTheDocument();
  });

  it('should render correctly when open', () => {
    const onToggleMock = jest.fn();
    render(
      <Accordion title={mockTitle} isOpen={true} onToggleClicked={onToggleMock}>
        {mockChildren}
      </Accordion>
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
    expect(screen.queryByTestId('chevron-down')).not.toBeInTheDocument();
  });

  it('should call onToggleClicked when the button is clicked', () => {
    const onToggleMock = jest.fn();
    render(
      <Accordion title={mockTitle} isOpen={false} onToggleClicked={onToggleMock}>
        {mockChildren}
      </Accordion>
    );

    const button = screen.getByRole('button', { name: mockTitle });
    fireEvent.click(button);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});