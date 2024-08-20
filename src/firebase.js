import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBN16Jsd92V5AKiOQ4XgWOGsm4zwiA9Nnc",
  authDomain: "getflix-e9cd4.firebaseapp.com",
  projectId: "getflix-e9cd4",
  storageBucket: "getflix-e9cd4.appspot.com",
  messagingSenderId: "967930470926",
  appId: "1:967930470926:web:69fbfe875e0a4fbf3c525f"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user= res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));       
    }
}
const logout=()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout};