import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "loginonecart-3b231.firebaseapp.com",
  projectId: "loginonecart-3b231",
  storageBucket: "loginonecart-3b231.firebasestorage.app",
  messagingSenderId: "248008710480",
  appId: "1:248008710480:web:b28c9b7936dadbc71eb455"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

