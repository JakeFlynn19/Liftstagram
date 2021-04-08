import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw_TzpwqVFKYCo-zhOfO---kbCjg22W50",
  authDomain: "liftstagram-6825c.firebaseapp.com",
  projectId: "liftstagram-6825c",
  storageBucket: "liftstagram-6825c.appspot.com",
  messagingSenderId: "810425001617",
  appId: "1:810425001617:web:d9ac13159068dcde740130",
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

function login() {
  auth.signInWithPopup(provider);
}

function logout() {
  auth.signOut();
}

export { auth, login, logout };
