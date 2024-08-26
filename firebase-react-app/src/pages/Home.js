import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebaseConfig";

export const Home = ({user}) => {
    const [isSignupActive, setIsSignUpActive] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleMethodChange = () => {
        setIsSignUpActive(!isSignupActive);
    }

    const handleSignUp = () => {
        if (!email || !password) return;
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    const handleSignIn = () => {
        if (!email || !password) return;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    if(user) {
        return <Navigate to="/private"></Navigate>
    }
    return (
        <section>
            <h1>Homepage</h1>

            <form>
                {isSignupActive && <legend>Sign Up</legend>}
                {!isSignupActive && <legend>Sign In</legend>}
                <fieldset>
                    <ul>
                        <li>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" onChange={handleEmailChange}  />
                        </li>
                        <li>
                            <label htmlFor='password'>Password</label>
                            <input type="password" id="password" onChange={handlePasswordChange} />
                        </li>
                    </ul>
                    {isSignupActive && <button type='button' onClick={handleSignUp}>Sign Up</button>}
                    {!isSignupActive && <button type='button' onClick={handleSignIn}>Sign In</button>}
                </fieldset>
                {isSignupActive && <a onClick={handleMethodChange}>Login</a>}
                {!isSignupActive && <a onClick={handleMethodChange}>Create an account</a>}
            </form>
        </section>
    );
};