import React, { useState } from 'react';
import './App.css';

import { MantineProvider } from '@mantine/core';

import {auth} from "./firebase-config";
import {useSignInWithGoogle} from "react-firebase-hooks/auth"
import { LoginForm } from "./components/Login"
import { GoogleLoginButton } from "./components/Login"

function App() {

  // Sign in with Google
  //We need 4 values
  //signInWithGoogle() modifies the state. User state will be modified later
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
	<MantineProvider> <div className="App">
      	{/* Log in fields */}
	  	<LoginForm></LoginForm>
	  	{/* Google Sign in Button */}
	  	<GoogleLoginButton onclick={() => signInWithGoogle()}></GoogleLoginButton>
    	
	</div> </MantineProvider> 
  );
}

export default App;
