import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function Firebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyCfsc1fcpwQntXULsf247H6h5tiYwGP5wQ",
    authDomain: "basaksehiravrupa2-481ab.firebaseapp.com",
    databaseURL: "https://basaksehiravrupa2-481ab-default-rtdb.firebaseio.com",
    projectId: "basaksehiravrupa2-481ab",
    storageBucket: "basaksehiravrupa2-481ab.appspot.com",
    messagingSenderId: "303203944226",
    appId: "1:303203944226:web:f13d77434641fe1952477b",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default Firebase;
