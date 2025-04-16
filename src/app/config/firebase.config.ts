import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkFaj6QkdE-ajcKXlJX0sdiApeA8hEGwA",
  authDomain: "studio-jatayu.firebaseapp.com",
  projectId: "studio-jatayu",
  storageBucket: "studio-jatayu.firebasestorage.app",
  messagingSenderId: "557757504832",
  appId: "1:557757504832:web:54e905fcc489186d8b2ea5",
  measurementId: "G-N7W4C9K2VS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  // Check if analytics is supported before initializing
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
export default app;
