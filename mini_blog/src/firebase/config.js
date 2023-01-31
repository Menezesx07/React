import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3KWR-dArrsNv1zh3rA1_pw3xX_5N582Q",
  authDomain: "miniblog-db8c1.firebaseapp.com",
  projectId: "miniblog-db8c1",
  storageBucket: "miniblog-db8c1.appspot.com",
  messagingSenderId: "155286632753",
  appId: "1:155286632753:web:5ace44f67510d673079810"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }