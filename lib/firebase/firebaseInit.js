import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from './config/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const db = app.firestore()

export { auth, db };