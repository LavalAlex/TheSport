import * as functions from "firebase-functions";
const express = require('express');
const server = express();
// const indexRoute = require('./routes/routes')
import indexRoute from "./routes/routes"

// const admin = require('firebase-admin');
// // import * as admin from 'firebase-admin';


// admin.initializeApp({
//   credential:admin.credential.cert("./Clave-TheSport.json"),
//   databaseURL:'https://fir-2b0d9.firebaseio.com'
// });

// const db = admin.firestore();
// server.get('/home', (req : any, res : any) => {
//     res.send('Home');
// });

// server.get('/login', (req : any, res : any) => {
//     res.send('Login');
// });

// server.get('/franco', (req : any, res : any) => {
//   res.send('Hola Francooo, esta noche jugamos a la consola y cocinanmos?');
// });

// server.post('/history', async (req: any, res: any) => {
//   console.log(req.body)
//   // res.send(req.body)
//   await db.collection("history")
//           .doc("/" + req.body.id + "/")
//           .create({name: req.body.name})
//   res.status(204).json('Created successfully')
// });

//Routes
server.use('/', indexRoute );

//Middlewares
server.use(express.json());
server.use(express.urlencoded({extended: false}));



exports.serve = functions.https.onRequest(server);


