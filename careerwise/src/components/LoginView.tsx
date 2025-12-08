import React from 'react';
import { Container, Flex, Paper, Stack, Title, Text, Space } from '@mantine/core';

/* Import Custom Components */
import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { GoogleSigninButton } from "./GoogleSigninButton";

interface LoginViewProps {
	signInWithGoogle: () => void;
}

export function LoginView({ signInWithGoogle }: LoginViewProps) {
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

