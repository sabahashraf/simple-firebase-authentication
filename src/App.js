import "./App.css";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase.init.js";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(result.user);
      })
      .catch((error) => console.error("error", error));
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(result.user);
      })
      .catch((error) => console.error("error", error));
  };

  return (
    <div className="App">
      {user.uid ? (
        <button onClick={handleSignOut}> sign out</button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>Google sign in</button>
          <button onClick={handleGithubSignIn}>Github sign in</button>
        </>
      )}
      <h2>{user.displayName}</h2>
      <p>{user.email}</p>
      <img src={user.photoURL} alt=""></img>
    </div>
  );
}

export default App;
