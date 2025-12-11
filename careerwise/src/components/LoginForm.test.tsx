import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';
import { GoogleSigninButton } from './GoogleSigninButton';

/* Test the LoginForm component */
describe("LoginForm Component Tests", () => {

  beforeEach(() => {
    render(
      <MantineProvider>
        <LoginForm />
      </MantineProvider>
    );
  });

  /* Test if fields are present */
  test("'Email' input field is present", () => {
    const emailField = screen.getByPlaceholderText(/e-?mail/i);
    expect(emailField).toBeInTheDocument();
  });

  test("'Password' password input field is present", () => {
    const passwordField = screen.getByPlaceholderText(/password/i);
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute("type", "password");
  });

  test('Text is enterable into email field', async () => {
    const emailField = screen.getByPlaceholderText(/e-?mail/i);
    const testStr = "testemail";

    const user = userEvent.setup();
    await user.type(emailField, testStr);

    expect(emailField).toHaveValue(testStr);
  });

  test('Text is enterable into password field', async () => {
    const passwordField = screen.getByPlaceholderText(/password/i);
    const testStr = "testpass";

    const user = userEvent.setup();
    await user.type(passwordField, testStr);

    expect(passwordField).toHaveValue(testStr);
  });
});

/* Test the Google Sign in button component */
describe("GoogleSigninButton Component Tests", () => {

  /* Dummy on click callback */
  const onClickTest = jest.fn();

  beforeEach(() => {
    render(
      <MantineProvider>
        <GoogleSigninButton onclick={onClickTest}/>
      </MantineProvider>
    );
  });

  /* Test if Google Sign in is present */
  test("Google 'Sign in' Button is present", () => {
    const googleButton = screen.getByRole("button", {
      name: /sign in with google/i
    });
    expect(googleButton).toBeInTheDocument();
  });

  /* Test that the on click callback works */
  test("Google 'Sign in' Button click is functional ", async () => {
    const googleButton = screen.getByRole("button", {
      name: /sign in with google/i
    });

    const user = userEvent.setup();
    await user.click(googleButton);

    expect(onClickTest).toHaveBeenCalled();
  });
});
