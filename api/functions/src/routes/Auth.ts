const firebase = require("firebase/app");
import { Router, Request, Response } from "express";
const route: Router = Router();
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDVG3zOjO33uyCGrBvEkLZrp3_4UI9vBks",
  authDomain: "fir-2b0d9.firebaseapp.com",
  projectId: "fir-2b0d9",
  storageBucket: "fir-2b0d9.appspot.com",
  messagingSenderId: "468309903947",
  appId: "1:468309903947:web:3b98d1408abea179555bce",
  measurementId: "G-0CQNJ3WXRN",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

route.post("/login", async (req: Request, res: Response) => {
  try {
    await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
    res.status(200).send("Successfully login");
  } catch (error) {
    console.log("Error on Login", error);
    res.status(501).send({ msg: "Error on Login" });
  }
});

route.post("/signup", async (req: Request, res: Response) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );
    res.status(200).send("Successfully register");
  } catch (e) {
    console.log(e);
    res.status(501).send({ msg: "Error on Register" });
  }
});

route.get("/", async (req: Request, res: Response) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      res.status(200).send({ email: user.email, uId: user.uid });
    } else {
      res.status(501).send({ error: "Error, user is not logged in" });
    }
  });
});

route.get("/logout", async (req: Request, res: Response) => {
  try {
    await signOut(auth);
    res.status(200).send("Successfully LogOut");
  } catch (e) {
    res.status(501).send({ msg: "Error on LogOut" });
  }
});

route.get("/facebook", async (req: Request, res: Response) => {
  try {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider);
    res.status(200).send("Successfully Login");
  } catch (error) {
    console.log("Error on login with Facebook", error);
    res.status(501).send({ msg: "Error on login with Facebook" });
  }
});

route.get("/google", async (req: Request, res: Response) => {
  console.log('login google')
  try {
    const provider:GoogleAuthProvider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    const user = await signInWithPopup(auth, provider);
    console.log(user)
    res.status(200).send("Successfully Login");
  } catch (error) {
    console.log("Error on login with Google", error);
    res.status(501).send({ msg: "Error on login with Facebook" });
  }
});

export default route;
