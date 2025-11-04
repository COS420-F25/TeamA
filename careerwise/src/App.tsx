import React, { useState } from 'react';
import './App.css';

/* Import Mantine Elements */
import { MantineProvider } from '@mantine/core';
import { DEFAULT_THEME } from '@mantine/core';

/* Import authentication */
import { auth } from "./firebase-config";
import { useSignInWithGoogle } from "react-firebase-hooks/auth"

/* Import Custom Components */
import { Header } from "./components/Header"
import { LoginForm } from "./components/LoginForm"
import { GoogleSigninButton } from "./components/GoogleSigninButton"

function App() {

  // Sign in with Google
  //We need 4 values
  //signInWithGoogle() modifies the state. User state will be modified later
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (<MantineProvider>
	<div className="App">
		{/* Header */}
		<Header theme={DEFAULT_THEME}></Header>

      	{/* Log in fields */}
	  	<LoginForm theme={DEFAULT_THEME}></LoginForm>

	  	{/* Google Sign in Button */}
	  	<GoogleSigninButton onclick={() => signInWithGoogle()}></GoogleSigninButton>
    	
	</div>
	</MantineProvider>);
}

export default App;
