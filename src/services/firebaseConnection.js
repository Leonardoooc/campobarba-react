
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA27UbgP410lRN_AYzE64XRypxFTrsztcA",
  authDomain: "tickets-171e6.firebaseapp.com",
  projectId: "tickets-171e6",
  storageBucket: "tickets-171e6.appspot.com",
  messagingSenderId: "483538825357",
  appId: "1:483538825357:web:70841612a0675e368cb2c4",
  measurementId: "G-6SYTJTVDFP"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };