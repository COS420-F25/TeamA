import React, { useState } from 'react';
import { Container, Stack, Text, Button, Space } from '@mantine/core';
import { User as FirebaseUser } from "firebase/auth";
import { signOut } from 'firebase/auth';
import { auth } from "../firebase-config";
import { Header } from "./Header";
import { ProgressView } from "./ProgressView";

interface DashboardViewProps {
	user: FirebaseUser;
}

export function DashboardView({ user }: DashboardViewProps) {
	const [page, setPage] = useState<"home" | "progress">("home");

	const SignOutMethod = () => {
		signOut(auth);
	};

	return (
		<div className="App">
			<Header />
			<Space h="xl" />
			<Container size="80%">
				{page === "home" && (
					<Stack gap="md">
						<Text>Hello your Email is: {user.email}</Text>

						<Button onClick={() => {setPage("progress")}}>
							Go to Progress Tracker
						</Button>

						{/*Add sign out button */}
						<Button onClick={SignOutMethod} color="red">Sign out</Button>
					</Stack>
				)}

				{page === "progress" && (
					<ProgressView page={page} setPage={setPage} />
				)}
			</Container>
		</div>
	);
}

