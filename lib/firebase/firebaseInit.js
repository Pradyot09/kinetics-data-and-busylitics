const { initializeApp } = require('firebase/app');
const { getAuth }= require('firebase/auth');
const { getFirestore } = require('firebase/firestore');
import { firebaseConfig } from './config/firebaseConfig';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
