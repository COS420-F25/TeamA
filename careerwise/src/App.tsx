import React, { useState } from 'react';
import './App.css';

/* Import Mantine Elements */
import { Container, Flex, MantineProvider, Paper, Stack, Title, Text, Space} from '@mantine/core';
import { careerWiseTheme } from "./Theme";

/* Import authentication */
import { auth, db } from "./firebase-config";
import {collection} from "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {signOut} from 'firebase/auth'; //I found signOut. Going to try it out

/* Import Custom Components */
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { GoogleSigninButton } from "./components/GoogleSigninButton";

function LoginView({signInWithGoogle}: {signInWithGoogle: () => void }) { //Now Login View accepts props from App the source of login.

  //This line needs to be removed to App()
  //const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  // eslint-disable-next-line no-multi-str
  const missionStatement = "Asynchronous is committed to guiding graduate \
  computer science students through the transition from academia to industry \
  by providing a clear, supportive platform to build resumes, showcase \
  professional profiles, connect with mentors, and actively pursue career \
  opportunities."

  return (
	//The below commented code I don't think needs to be in Login View.
	//Rather it should be in App()
	//<MantineProvider theme={careerWiseTheme}>
	<div className="App">
		{/* Header */}
		<Header />
		<Space h="xl" />

		<Container size="80%">
			<Flex
				direction={{base: "column-reverse", sm: "row"}}
				gap="xl"
				align="center"
			>
				{/* Left side: Mission Statement */}
				<Paper flex={1} p="md" shadow="xs" radius="md" withBorder>
					<Title order={3}>Mission Statement</Title>
					<Text>{missionStatement}</Text>
				</Paper>

				{/* Right side: Login fields */}
				<Stack flex={1} align="center" gap="md">
					{/* Title of form */}
					<Title order={3}> Log in to CareerWise </Title>
					{/* Log in fields */}
					<LoginForm />

					{/* Google Sign in Button */}
					<Text>Or</Text>
					{/* Fixed signIn by directly refrencing it.
					/*  Instead of using the arrow function. */}
					<GoogleSigninButton onclick={signInWithGoogle} />
				</Stack>
			</Flex>
		</Container>
    	
	</div>
	//Removed end as well
	//</MantineProvider>
	);
}

//Adding props this time for user
function DashboardView({user}: {user: something}) { //User can be a lot of things. Will look into this
	const SignOutMethod = () => {signOut(auth)}; //Sign out method

}

//Incomplete
function App() {
	// Sign in with Google
  	//We need 4 values
  	//signInWithGoogle() modifies the state. User state will be modified later
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

	if(loading) {
		return (
			something;
		);
	}

	if(error) {
		return (
			something;
		);
	}

	return (
		//Main return state. Dependant on user state.
	)
}

export default App;
