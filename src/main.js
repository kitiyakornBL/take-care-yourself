import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
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
const db = getFirestore(app);
// const auth = firebase.auth();

//-----------------------------------------------------------------------

const fetchNewsData = async () => {
  const data = collection(db, "news");
  const newsList = await getDocs(data);
  const news = newsList.docs.map((doc) => doc.data());
  return { news };
};

export { fetchNewsData };
