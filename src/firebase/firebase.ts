import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  apiKey: 'AIzaSyARe5fprrboa5qVuIZ1htzC7K1e2-iTf-o',
  authDomain: 'customercity-355811.firebaseapp.com',
  projectId: 'customercity-355811',
  storageBucket: 'customercity-355811.appspot.com',
  messagingSenderId: '477883095009',
  appId: '1:477883095009:web:e0c6a15b8acb1c5b3b64a0',
}; // from Firebase Console

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const db = firebase.firestore();

export default firebase;
