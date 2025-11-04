/* File LoginForm.tsx
 * Contains login/signin form for entering username/password
 */

/* Import Mantine Components */
import { Button, PasswordInput, TextInput, Container, MantineTheme } from "@mantine/core";
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
	return <Container>
		<form>
			{/* Email text box */}
			<TextInput
				placeholder="Email" 
				key={loginForm.key("email")}
				{...loginForm.getInputProps("email")}
			/>

			{/* Password text box */}
			<PasswordInput
				placeholder="Password" 
				key={loginForm.key("password")}
				{...loginForm.getInputProps("password")}
			/>

			{/* Log in button */}
			<Button bg={props.theme.primaryColor} type="submit">Log in</Button>
		</form>
	</Container>
}