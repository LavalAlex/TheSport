// const express = require('express');
import axios from "axios";
import { Router } from "express";
const route: Router = Router();
const { loadDB } = require("../utils/utils");
const admin = require("firebase-admin");
const clave = require('../../TheSport-Clave.ts')
// import {clave} from "../../TheSport-Cla"
// import * as admin from 'firebase-admin';
console.log(clave)
admin.initializeApp({
  credential: admin.credential.cert("Clave-TheSport.json.env"),
  databaseURL: "https://fir-2b0d9.firebaseio.com",
});

const db = admin.firestore();
route.get("/home", (req: any, res: any) => {
  res.send("Home");
});

route.get("/login", (req: any, res: any) => {
  res.send("Login");
});

route.get("/favorite/:id", async (req: any, res: any) => {
  try {
    const doc = db.collection("favorite").doc(req.params.id);
    const item = await doc.get();
    const response = item.data();
    res.status(200).send(response);
  } catch (e) {
    console.log("Error on get DB: ", e);
    res.status(500).send({ error: e });
  }
});

route.get("/favorite", async (req: any, res: any) => {
  try {
    const query = db.collection("favorite");
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;
    const response = docs.map((e: any) => ({
      id: e.id,
      name: e.data().name,
      image: e.data().image,
      favorite: e.data().favorite
    }));

    res.status(200).send(response);
  } catch (e) {
    console.log("Error on get all", e);
    res.status(500).send({ error: e });
  }
});

route.delete("/favorite/:id", async (req: any, res: any) => {
  try {
    const doc = db.collection("favorite").doc(req.params.id);
    await doc.delete();
    res.status(200).send("Successful deletion");
  } catch (e) {
    console.log("Error on deleted", e);
    res.status(500).send({ error: e });
  }
});

route.put("/favorite/:id", async (req: any, res: any) => {
  try {
    const doc = db.collection("favorite").doc(req.params.id);
    await doc.update({
      favorite: req.body.favorite,
    });
    res.status(200).send("Seccessful update");
  } catch (e) {
    console.log("Error on update", e);
    res.status(500).send({ Error: e });
  }
});

route.get("/all", async (req: any, res: any) => {
  try {
    const response = await axios.get(
      "https://www.thesportsdb.com/api/v1/json/2/all_sports.php"
    );
    console.log(response.data);
    res.status(200).send(response.data.sports);
  } catch (e) {
    console.log("Error on get All", e);
    res.status(500).send({ Error: e });
  }
});

route.post("/favorite", async (req: any, res: any) => {
  try {
    await db
      .collection("favorite")
      .doc("/" + req.body.id + "/")
      .create({ name: req.body.name, image: req.body.image, favorite: false });
    res.status(204).send("Created successfully");
  } catch (e) {
    console.log("Error on post history", e);
    res.status(500).send({ error: e });
  }
});

route.get("/load", (req: any, res: any) => {
  res.status(200).send(loadDB(db));
});

export default route;