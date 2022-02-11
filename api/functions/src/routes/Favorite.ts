// const express = require('express');
import axios from "axios";

import { Router, Request, Response } from "express";
import { homeFavorite } from "../Interfaces/interfaces";

const route: Router = Router();
const { loadDB } = require("../utils/utils");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("Clave-TheSport.json"),
  databaseURL: "https://fir-2b0d9.firebaseio.com",
});

const db = admin.firestore();

route.get("/favorite/:id", async (req: Request, res: Response) => {
  try {
    const doc = db.collection("favorite").doc(req.params.id);
    const item = await doc.get();
    const response = item.data();
    res.status(200).send(response);
  } catch (e) {
    console.log("Error on get DB: ", e);
    res.status(500).send({ msg: "Error on favorite id" });
  }
});

route.get("/favorite", async (req: Request, res: Response) => {
  try {
    const query = db.collection("favorite");
    const querySnapshot = await query.get();
    const docs: Array<homeFavorite> = querySnapshot.docs;
    var response = docs.map(
      (e: homeFavorite) =>
        ({
         idSport: e.id,
         strSportThumb:e.data().strSportThumb,
         strSport: e.data().strSport,
         strSportDescription:e.data().strSportDescription,
         favorite: e.data().favorite,
        })
    );
    res.status(200).send(response);
  } catch (e) {
    console.log("Error on get all", e);
    res.status(500).send({ msg: "Error on get all favorite" });
  }
});

route.delete("/favorite/:id", async (req: Request, res: Response) => {
  try {
    const doc = db.collection("favorite").doc(req.params.id);
    await doc.delete();
    res.status(200).send("Successful deletion");
  } catch (e) {
    console.log("Error on deleted", e);
    res.status(500).send({ msg: "Error on deleted" });
  }
});

route.put("/favorite/:id", async (req: Request, res: Response) => {
  try {
    const doc = db.collection("favorite").doc(req.params.id);
    await doc.update({
      favorite: req.body.favorite,
    });
    res.status(200).send("Seccessful update");
  } catch (e) {
    console.log("Error on update", e);
    res.status(500).send({ msg: "Error on uddate" });
  }
});

route.get("/all", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://www.thesportsdb.com/api/v1/json/2/all_sports.php"
    );
    res.status(200).send(response.data.sports);
  } catch (e) {
    console.log("Error on get All", e);
    res.status(500).send({ msg: "Error on get all" });
  }
});

route.post("/favorite", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    await db
      .collection("favorite")
      .doc("/" + req.body.idSport + "/")
      .create({
        strSport: req.body.strSport,
        strSportThumb: req.body.strSportThumb,
        strSportDescription: req.body.strSportDescription,
        favorite: req.body.favorite ? true : false,
      });
    res.status(204).send("Created successfully");
  } catch (e) {
    console.log("Error on post history", e);
    res.status(500).send({ msg: "Error on post history" + " Code: " + e });
  }
});

route.get("/load", (req: Request, res: Response) => {
  res.status(200).send(loadDB(db));
});

export default route;
