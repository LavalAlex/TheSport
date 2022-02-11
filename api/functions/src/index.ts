import * as functions from "firebase-functions";
import favorite from "./routes/Favorite"
import auth from "./routes/Auth"
import cors from "cors";
import morgan from "morgan";

const express = require('express');
const server = express();




//Middlewares
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({extended: false}));

//Routes
server.use('/auth', auth);
server.use('/', favorite );
export const serve = functions.https.onRequest(server);

 


