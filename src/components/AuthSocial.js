import React from 'react';
import { authService } from '../fBase';
import {
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

const AuthSocial = () => {
    const onClick = async (e) => {
        const {
            target: { name },
        } = e;
        let provider;
        try {
            if (name === 'google') {
                provider = new GoogleAuthProvider();
                const result = await signInWithPopup(authService, provider);
                GoogleAuthProvider.credentialFromResult(result);
            } else if (name === 'facebook') {
                provider = new FacebookAuthProvider();
                const result = await signInWithPopup(authService, provider);
                FacebookAuthProvider.credentialFromResult(result);
            } else if (name === 'github') {
                provider = new GithubAuthProvider();
                const result = await signInWithPopup(authService, provider);
                GithubAuthProvider.credentialFromResult(result);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="socialBtns">
            <button name="google" className="socialBtn" onClick={onClick}>
                Google
            </button>
            <button name="facebook" className="socialBtn" onClick={onClick}>
                FaceBook
            </button>
            <button name="github" className="socialBtn" onClick={onClick}>
                GitHub
            </button>
        </div>
    );
};

export default AuthSocial;
