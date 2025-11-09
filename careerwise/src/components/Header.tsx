/* File Header.tsx
 * Contains components for website header, to be used across most pages
 */
import React from "react";

/* Import Mantine Components */
import { Container, Group, useMantineTheme } from "@mantine/core";

/* Component Header:
 * Written by: Brady Dube, COS420 Team A
 * Provides a header visible at the top of the website, for when the user is not
 * logged in.
 */

interface HeaderProps {
}

export function Header(props: HeaderProps): React.JSX.Element {

	const theme = useMantineTheme();

	/* Return the Header */
	return <header>
		<Container h="4rem" bg={theme.primaryColor} fluid>
			<Group align="center">
				<h1 style={{color: theme.white}}>CareerWise</h1>
			</Group>
		</Container>
	</header>
}