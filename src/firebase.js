import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import{getAuth}from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDbqAysvkx4QnzcS5QoCwDtfe25YLsivSE",
    authDomain: "project-2b9a6.firebaseapp.com",
    projectId: "project-2b9a6",
    storageBucket: "project-2b9a6.appspot.com",
    messagingSenderId: "242011183400",
    appId: "1:242011183400:web:aefcf3ca0820f17a2b981d",
    measurementId: "G-X56S3MWCWG"
  };
  const app = initializeApp(firebaseConfig);
  export const auth=getAuth(app)
  export const db= getFirestore(app)
