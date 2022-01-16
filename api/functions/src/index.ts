import * as functions from "firebase-functions";
const express = require('express');
const server = express();
// const indexRoute = require('./routes/routes')
import indexRoute from "./routes/routes"


//Routes
server.use('/', indexRoute );

//Middlewares
server.use(express.json());
server.use(express.urlencoded({extended: false}));



exports.serve = functions.https.onRequest(server);


