import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyCS63VThfFFU4N3O7QUuzWqWNzxuInWoUc",
   authDomain: "food-manager-b7ca2.firebaseapp.com",
   projectId: "food-manager-b7ca2",
   storageBucket: "food-manager-b7ca2.firebasestorage.app",
   messagingSenderId: "242396795795",
   appId: "1:242396795795:web:23d1a5fe84bab63d8ece66"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };