import React from 'react';
import './App.css';

import {auth} from "./firebase-config";
import {useSignInWithGoogle} from "react-firebase-hooks/auth"

function App() {

  //We need 4 values
  //signInWithGoogle() modifies the state. User state will be modified later
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="App">
      {/*Add sign in button */}
      <button onClick={() => signInWithGoogle()}>Sign In</button>
    </div>
  );
}

export default App;
