import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebaseConfig";

export const Home = () => {
    const [isSignupActive, setIsSignUpActive] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleMethodChange = () => {
        setIsSignUpActive(!isSignupActive);
    }

    const handleSignUp = () => {
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

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    // https://www.youtube.com/watch?v=PngrpszT3aY at 6:45 - firebase section
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
                    {!isSignupActive && <button type='button'>Sign In</button>}
                </fieldset>
                {isSignupActive && <a onClick={handleMethodChange}>Login</a>}
                {!isSignupActive && <a onClick={handleMethodChange}>Create an account</a>}
            </form>
        </section>
    );
};