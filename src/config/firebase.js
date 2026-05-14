
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail  } from "firebase/auth";
import { getFirestore, setDoc, doc, collection, getDocs ,query,where } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB2H6l_8G6xelpQC4GIJ-rBSvMqpZZX96k",
  authDomain: "talkify-m.firebaseapp.com",
  projectId: "talkify-m",
  storageBucket: "talkify-m.appspot.com",
  messagingSenderId: "701533089773",
  appId: "1:701533089773:web:3383de6239e067aa59c1e4"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There I am using Talkify",
      lastSeen: Date.now()
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatData: []
    });

  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

export const resetPass = async (email) =>{
      if(!email){
        toast.error("Enter your email");
        return null;
      }
   try {
    const userRef = collection(db,'users');
    const q = query(userRef,where("email","==",email));
    const querySnap = await getDocs(q);
    if(!querySnap.empty){
      await sendPasswordResetEmail(auth,email);
      toast.success("Reset Email Sent");
    }
    else{
      toast.error("Email doesn't exist");
    }
    
   } catch (error) {
    console.error(error);
    toast.error(error.message);
   }
};


