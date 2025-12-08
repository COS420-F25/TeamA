import { render, screen, fireEvent } from '@testing-library/react';
import Questionnaire from './Questionnaire';
import React from 'react';

describe('Questionnaire Component', () => {
  test('renders questionnaire title', () => {
    render(<Questionnaire />);
    expect(screen.getByText(/CareerWise Job Interest Questionnaire/i)).toBeInTheDocument();
  });

  test('selecting an option updates state', () => {
    render(<Questionnaire />);
    const option = screen.getByLabelText(/Web Development/i);
    fireEvent.click(option);
    expect(option).toBeChecked();
  });

  test('submit button logs answers', () => {
    console.log = jest.fn(); // mock console.log
    render(<Questionnaire />);

    fireEvent.click(screen.getByLabelText(/Web Development/i));
    fireEvent.click(screen.getByText(/Submit/i));

    expect(console.log).toHaveBeenCalledWith(expect.objectContaining({
      1: 'Web Development'
    }));
  });
});
