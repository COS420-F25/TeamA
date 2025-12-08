/*
 * This file has been refactored to separate the main view components into their own files.
 * The following components have been extracted:
 * - LoginView: Moved to src/components/LoginView.tsx - handles the login page with mission statement and login form
 * - DashboardView: Moved to src/components/DashboardView.tsx - handles the authenticated user dashboard with navigation
 * - ProgressView: Moved to src/components/ProgressView.tsx - handles the progress tracker view
 * 
 * The App component now serves as the main entry point that handles authentication state
 * and conditionally renders either LoginView or DashboardView based on user authentication status.
 * The page state management for switching between home and progress views is now handled
 * internally within DashboardView, and ProgressView receives a callback function instead of
 * page state props for navigation back to the dashboard.
 */

import React from 'react';
import './App.css';

/* Import Mantine Elements */
import { Container, MantineProvider, Text } from '@mantine/core';
import { careerWiseTheme } from "./Theme";

/* Import authentication */
import { auth } from "./firebase-config";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

/* Import Custom Components */
import { LoginView } from "./components/LoginView";
import { DashboardView } from "./components/DashboardView";

function App() {
	//Get current user and authentication state
	const [CurrentUser, authLoading, authError] = useAuthState(auth);
	//Signinwithgoogle I've ignored user cause I'm trying to handle it elsewhere
	const [signInWithGoogle, , SignInLoading, SignInError] = useSignInWithGoogle(auth);

	//Show a loading screen
	if(authLoading || SignInLoading) {
		return (
			//Add MantineProvider here
			<MantineProvider theme={careerWiseTheme}>
				<Container size="80%" mt="xl">
					{/*Add loading page */}
					<Text ta="center" size="xl">Loading....</Text>
				</Container>
			</MantineProvider>
		);
	}

	//Show error screen if there's an auth or sign in error
	const combinedError = SignInError || authError;
	if(combinedError) {
		return (
			<MantineProvider theme={careerWiseTheme}>
				<Container size="80%" mt="xl">
					{/*Add error page */}
					<Text ta="center" size="xl">Error: {combinedError.message}</Text>
				</Container>
			</MantineProvider>
		);
	}

	return (
		//Conditional show dashboard if the user is authenticated else do the login view.
		<MantineProvider theme={careerWiseTheme}>
			{CurrentUser ? (
				<DashboardView user={CurrentUser} />
			) : (
				<LoginView signInWithGoogle={signInWithGoogle} />
			)}
		</MantineProvider>
	)
}

export default App;
