import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDiFemQgvz_sDf3iziKaaqY0wAbE9ecbco",
  authDomain: "todosreact-a18e8.firebaseapp.com",
  projectId: "todosreact-a18e8",
  storageBucket: "todosreact-a18e8.appspot.com",
  messagingSenderId: "206861045069",
  appId: "1:206861045069:web:fd67de15b3180e2c38fb04",
  measurementId: "G-313XXJYC4L"
};

export const fireBaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(fireBaseApp);