import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: import.meta.env.VITE_firebase_api_key,
   authDomain: import.meta.env.VITE_firebase_auth_domain,
   projectId: import.meta.env.VITE_firebase_project_id,
   storageBucket: import.meta.env.VITE_firebase_storage_bucket,
   messagingSenderId: import.meta.env.VITE_firebase_messaging_sender_id,
   appId: import.meta.env.VITE_firebase_app_id
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };