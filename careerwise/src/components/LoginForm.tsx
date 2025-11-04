/* File LoginForm.tsx
 * Contains login/signin form for entering username/password
 */

/* Import Mantine Components */
import { 
	Button, 
	Container, 
	PasswordInput, 
	Stack,
	TextInput, 
	MantineTheme,
	Flex,
 } from "@mantine/core";

import { useForm } from "@mantine/form"
import "@mantine/core/styles.css"

/* Component LoginForm:
 * Written by: Brady Dube, COS420 Team A
 * Provides a login component that has text boxes for username and password, and
 * a button to submit.
 */

interface LoginFormProps {
	theme: MantineTheme
}

export function LoginForm(props: LoginFormProps): React.JSX.Element {

	/* Create Mantine form for login */
	const loginForm = useForm({
		mode:"uncontrolled",
		initialValues: {
			email: "",
			password: ""
		}
	});
	
	/* Return the form */
	return <form>
		<Stack gap="sm" align="center">
			{/* Email text box */}
			<TextInput
				miw="24rem"
				placeholder="Email" 
				key={loginForm.key("email")}
				{...loginForm.getInputProps("email")}
			/>

			{/* Password text box */}
			<PasswordInput
				miw="24rem"
				placeholder="Password" 
				key={loginForm.key("password")}
				{...loginForm.getInputProps("password")}
			/>

			{/* Log in button */}
			<Button miw="8rem" bg={props.theme.primaryColor} type="submit">Log in</Button>
		</Stack>
	</form>
}