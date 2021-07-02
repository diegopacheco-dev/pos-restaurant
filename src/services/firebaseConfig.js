import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBmn7vmaGkao4Gx3x5vM5D7cDLNuTb21yc",
    authDomain: "pos-restaurant-8e45f.firebaseapp.com",
    projectId: "pos-restaurant-8e45f",
    storageBucket: "pos-restaurant-8e45f.appspot.com",
    messagingSenderId: "921793618148",
    appId: "1:921793618148:web:66ef101d9bad1b35ac4cf1",
    measurementId: "G-E7RXWYEQM9"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
