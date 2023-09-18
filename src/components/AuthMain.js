import React, { useState } from 'react';
import { authService } from '../fBase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import AuthSocial from './AuthSocial';
import { SignIn } from './styled';

const AuthMain = ({ darkMode }) => {
    const [email, setEmail] = useState('');
    const [pw, setpw] = useState('');
    const [newUser, setNewUser] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setpw(value);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newUser) {
                data = await createUserWithEmailAndPassword(authService, email, pw);
            } else {
                data = await signInWithEmailAndPassword(authService, email, pw);
            }
        } catch (error) {
            console.log(error.message);
            alert(error.message.replace('Firebase: ', ''));
        }
    };
    const onClick = (e) => {
        const {
            target: { name },
        } = e;
        if (name === 'onCancle' || name === 'onCreate') {
            setNewUser((prev) => !prev);
            setSocialToggle(false);
        } else if (name === 'onSocial') {
            setSocialToggle((prev) => !prev);
        }
    };
    return (
        <SignIn $darkmode={darkMode} newUser={newUser}>
            <div className="signInBox">
                {!newUser ? <h1>Think UpOut .</h1> : <p className="createTitle">Sign Up</p>}
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder={!newUser ? 'Email' : 'New Email'}
                        required
                        value={email}
                        onChange={onChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder={!newUser ? 'Password' : 'New Password'}
                        required
                        value={pw}
                        onChange={onChange}
                    />
                    {!newUser ? (
                        <>
                            <button type="submit">로그인</button>
                            <button type="button" name="onCreate" onClick={onClick}>
                                회원가입
                            </button>
                            <button
                                type="button"
                                name="onSocial"
                                className="onSocialBtn"
                                onClick={onClick}
                            >
                                소셜 로그인
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="submit">가입하기</button>
                            <button type="button" name="onCancle" onClick={onClick}>
                                돌아가기
                            </button>
                        </>
                    )}
                </form>
                {socialToggle && <AuthSocial />}
            </div>
        </SignIn>
    );
};

export default AuthMain;
