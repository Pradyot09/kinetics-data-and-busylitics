import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config/firebaseConfig';
import { getFirestore } from 'firebase/firestore';

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };