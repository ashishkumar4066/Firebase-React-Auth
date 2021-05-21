import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBKh-sWUrn79vxKK2UsOoe-3UCK-TqJy0o",
  authDomain: "guide-game-34b0e.firebaseapp.com",
  projectId: "guide-game-34b0e",
  storageBucket: "guide-game-34b0e.appspot.com",
  messagingSenderId: "684964311757",
  appId: "1:684964311757:web:dea2854193fa450d2baf84",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

export const firestore = firebase.firestore();
