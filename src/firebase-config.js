import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvtn3jq_74g1342kiIFkOmaXIitNSGKn8",
  authDomain: "retomada-ufop-fc15b.firebaseapp.com",
  projectId: "retomada-ufop-fc15b",
  storageBucket: "retomada-ufop-fc15b.appspot.com",
  messagingSenderId: "403622635258",
  appId: "1:403622635258:web:8cdf80deb6fda181120b43",
  measurementId: "G-DDED77N8C0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const database = getDatabase(app);
