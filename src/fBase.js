import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBDd9-3RCQW264wcHg4mzRydMvJi-0hzAc',
    authDomain: 'thinkupout-dbbee.firebaseapp.com',
    projectId: 'thinkupout-dbbee',
    storageBucket: 'thinkupout-dbbee.appspot.com',
    messagingSenderId: '698410194944',
    appId: '1:698410194944:web:cb9d219ce726353ad120e5',
    measurementId: 'G-847HG60LX7',
};

export const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const dbService = getFirestore();
export const storageService = getStorage();
