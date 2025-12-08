	import React, { useState } from 'react';
	import './App.css';

	/* Import Mantine Elements */
	import { Container, Flex, MantineProvider, Paper, Stack, Title, Text, Space, Button} from '@mantine/core';
	import { careerWiseTheme } from "./Theme";

	/* Import authentication */
	import {auth} from "./firebase-config";
	//import {collection} from "firebase/firestore";
	//import {useCollection} from "react-firebase-hooks/firestore";
	import {useSignInWithGoogle} from "react-firebase-hooks/auth";
	import {signOut} from 'firebase/auth'; //I found signOut. Going to try it out
	import {User as FirebaseUser} from "firebase/auth";
	import { useAuthState} from 'react-firebase-hooks/auth';

	/* Import Custom Components */
	import { Header } from "./components/Header";
	import { LoginForm } from "./components/LoginForm";
	import { GoogleSigninButton } from "./components/GoogleSigninButton";
	import { ProgressView } from "./ProgressView";

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
						<GoogleSigninButton onclick={() => {signInWithGoogle()}} />
					</Stack>
				</Flex>
			</Container>
			
		</div>
		);
	}

	//Adding props this time for user
	function DashboardView({user}: {user: FirebaseUser}) {
		const[page,setPage] = useState<"home" | "progress">("home")
		

		const SignOutMethod = () => {
			signOut(auth);
		}; //Sign out method


		return (

			/*Copying same structure from Login V */
			<div className="App">
			<Header />
			<Space h="xl" />
			<Container size="80%">
				{page === "home" &&(
				<Stack gap="md">
					<Text>Hello your Email is: {user.email}</Text>

					<Button onClick={() => {setPage("progress")}}>
              		Go to Progress Tracker
            		</Button>

					{/*Add sign out button */}
					<Button onClick={SignOutMethod} color="red">Sign out</Button>
				</Stack>
				)}

				{page === "progress" &&(
				<ProgressView page={page} setPage={setPage}/>
				)}
			</Container>
			</div>
		);

	}



	//I think the key thing wrong is something in here
	function App() {

		//Get current user and authentication state
		const [CurrentUser, authLoading, authError] = useAuthState(auth);
		//Signinwithgoogle I've ignored user cause I'm trying to handle it elsewhere
		const [signInWithGoogle, ,SignInLoading, SignInError] = useSignInWithGoogle(auth);


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
