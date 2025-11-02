import React, { useState } from 'react';
import './App.css';

import {auth} from "./firebase-config";
import {useSignInWithGoogle} from "react-firebase-hooks/auth"
import { LoginField } from "./components/Login"
import { GoogleLoginButton } from "./components/Login"

function App() {


  /* Use state for email and password from user */
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Sign in with Google
  //We need 4 values
  //signInWithGoogle() modifies the state. User state will be modified later
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="App">
      {/* Log in fields */}
	  <LoginField setEmail={setEmail} setPassword={setPassword}></LoginField>
	  {/* Google Sign in Button */}
	  <GoogleLoginButton onclick={() => signInWithGoogle()}></GoogleLoginButton>
    </div>
  );
}

export default App;
