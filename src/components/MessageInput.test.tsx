import { render, screen, fireEvent } from '@testing-library/react';
import { MessageInput } from './MessageInput';

describe('MessageInput', () => {
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <MessageInput
        value=""
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByLabelText('Votre requête')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onChange when typing', () => {
    render(
      <MessageInput
        value=""
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText('Votre requête'), {
      target: { value: 'test message' }
    });

    expect(mockOnChange).toHaveBeenCalledWith('test message');
  });

  it('enables submit button when there is input', () => {
    render(
      <MessageInput
        value="test message"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('calls onSubmit when form is submitted', () => {
    render(
      <MessageInput
        value="test message"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />
    );

    fireEvent.submit(screen.getByRole('form'));
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});