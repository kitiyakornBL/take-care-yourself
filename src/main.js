import * as firebaseAuth from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const apps = createApp(App);
const pinia = createPinia();

apps.use(pinia);
// import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiZV2NOBxAHSiAVM8zejnJWxSzVQMxz9s",
  authDomain: "take-care-yourself.firebaseapp.com",
  projectId: "take-care-yourself",
  storageBucket: "take-care-yourself.appspot.com",
  messagingSenderId: "327595175861",
  appId: "1:327595175861:web:25b5c2b898e584718bf3fc",
};

const app = initializeApp(firebaseConfig);
const auth = firebaseAuth.getAuth(app);
const db = getFirestore(app);
// const auth = firebase.auth();

//------------------------- Credentail ----------------------------------------------

const LoginWithFirebase = async (email, password) => {
  try {
    const provider = await firebaseAuth.signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return provider;
  } catch (e) {
    alert(e);
  }
};

const LoginWithGoogle = async () => {
  try {
    const googleProvider = new firebaseAuth.GoogleAuthProvider();
    return await firebaseAuth.signInWithPopup(auth, googleProvider);
  } catch (e) {
    alert(e);
  }
};

//------------------------ Mange Data -----------------------------------------------

const fetchNewsData = async () => {
  const data = collection(db, "news");
  const newsList = await getDocs(data);
  const news = newsList.docs.map((doc) => doc.data());
  return { news };
};

const fetchHopitalData = async () => {
  const data = collection(db, "hospital");
  const hospitalList = await getDocs(data);
  const hospital = hospitalList.docs.map((doc) => doc.data());
  return { hospital };
};

export { fetchNewsData, fetchHopitalData, LoginWithGoogle, LoginWithFirebase };
