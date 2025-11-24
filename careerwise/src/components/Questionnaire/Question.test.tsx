import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Question from './Question';

describe('Question component', () => {
  const sampleProps = {
    question: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green'],
    selectedOption: null,
    onSelect: jest.fn(),
  };

  it('renders the question text', () => {
    render(<Question {...sampleProps} />);
    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument();
  });

  it('renders all provided options', () => {
    render(<Question {...sampleProps} />);
    sampleProps.options.forEach(option => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  it('calls onSelect when an option is clicked', () => {
    render(<Question {...sampleProps} />);
    const optionInput = screen.getByLabelText('Blue');
    fireEvent.click(optionInput);
    expect(sampleProps.onSelect).toHaveBeenCalledWith('Blue');
  });
});
