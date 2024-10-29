import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCi_J5lv7utn-AwGj-LJ-stOljmu629LjQ",
    authDomain: "lucid-dreams-firebase.firebaseapp.com",
    projectId: "lucid-dreams-firebase",
    storageBucket: "lucid-dreams-firebase.appspot.com",
    messagingSenderId: "779868598540",
    appId: "1:779868598540:web:cdc6178964675ac98c1929",
    measurementId: "G-R3MGX5B5JX"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { database, auth, googleProvider };