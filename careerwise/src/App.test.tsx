import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginForm } from './components/LoginForm';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';
import { GoogleSigninButton } from './components/GoogleSigninButton';

/* Test the LoginForm component */
describe("LoginForm Component Tests", () => {

	beforeEach(() => {
		render(
			<MantineProvider>
			<LoginForm />
			</MantineProvider>
		);
	});

	test('Tests work', () => {
		const passwordField = screen.getByPlaceholderText(/password/i);
		const testStr = "not_failing_test"
		userEvent.type(passwordField, testStr);
		expect(passwordField).toHaveValue("failing_test");
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

	test('Text is enterable into email field', () => {
		const emailField = screen.getByPlaceholderText(/e-?mail/i);
		const testStr = "testemail"
		userEvent.type(emailField, testStr);
		expect(emailField).toHaveValue(testStr);
	});

	test('Text is enterable into password field', () => {
		const passwordField = screen.getByPlaceholderText(/password/i);
		const testStr = "testpass"
		userEvent.type(passwordField, testStr);
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
	test("Google 'Sign in' Button click is functional ", () => {
		const googleButton = screen.getByRole("button", {
			name: /sign in with google/i
		});
		userEvent.click(googleButton);
		expect(onClickTest).toHaveBeenCalled();
	});
});

