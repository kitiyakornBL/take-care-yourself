import * as firebaseAuth from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { deleteDoc, setDoc, addDoc, doc } from "firebase/firestore";

// import { createApp } from "vue";
// import { createPinia } from "pinia";
// import App from "src/App.vue";

// const apps = createApp(App);
// const pinia = createPinia();

// apps.use(pinia);

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

const RegistWithFirebase = async (email, password) => {
  try {
    const provider = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return provider;
  } catch (e) {
    throw new Error(e);
  }
};

const ForgotPassword = async (email) => {
  try {
    const resetProvider = await firebaseAuth.sendPasswordResetEmail(
      auth,
      email
    );
    alert("คำร้องขอการเปลี่ยนรหัสผ่านได้ถูกส่งไปยังอีเมลเเล้ว");
    return resetProvider;
  } catch (error) {
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

const fetchTimeline = async () => {
  const data = collection(db, "timeline");
  const timelineList = await getDocs(data);
  const timeline = timelineList.docs.map((doc) => doc.data());
  const id = timelineList.docs.map((doc) => doc.id);
  timeline.forEach((data, i) => (data.id = id[i]));
  return { timeline };
};

const fetchHopitalData = async () => {
  const data = collection(db, "hospital");
  const hospitalList = await getDocs(data);
  const hospital = hospitalList.docs.map((doc) => doc.data());
  return { hospital };
};

const createTimeline = async (payload) => {
  await addDoc(collection(db, "timeline"), { payload });
  // await setDoc(doc(db, "timeline"), payload);
  // console.log("successed");
};

const deleteTimeline = async (id) => {
  await deleteDoc(doc(db, "timeline", id));
  // await setDoc(doc(db, "timeline"), payload);
  // console.log("successed");
};

export {
  auth,
  deleteTimeline,
  createTimeline,
  fetchTimeline,
  fetchNewsData,
  fetchHopitalData,
  ForgotPassword,
  LoginWithGoogle,
  LoginWithFirebase,
  RegistWithFirebase,
};
