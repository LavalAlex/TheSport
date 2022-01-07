// const express = require('express');
import { Router } from "express";
const route : Router = Router()

const admin = require('firebase-admin');
// import * as admin from 'firebase-admin';


admin.initializeApp({
  credential:admin.credential.cert("./Clave-TheSport.json"),
  databaseURL:'https://fir-2b0d9.firebaseio.com'
});

const db = admin.firestore();
route.get('/home', (req : any, res : any) => {
    res.send('Home');
});

route.get('/login', (req : any, res : any) => {
    res.send('Login');
});

route.get('/franco', (req : any, res : any) => {
  res.send('Hola Francooo, esta noche jugamos a la consola ');
});

route.post('/history', async (req: any, res: any) => {
    try{
        await db.collection("history")
        .doc("/" + req.body.id + "/")
        .create({name: req.body.name});
        res.status(204).send('Created successfully');
    }catch(e){
        console.log('Error on post history',e)
        res.status(500).send({error:e})
    }
});

route.get('/history/:id', async (req : any, res : any) => {
    try{
        const doc = db.collection('history').doc(req.params.id);
        const item = await doc.get();
        const response = item.data();
        res.status(200).send(response)
    }catch(e){
        console.log('Error on get DB: ', e );
        res.status(500).send({error: e});
    }
})

route.get('/history', async (req : any, res : any) => {
    try{
        const query = db.collection('history');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map((e : any) => ({
            id:e.id,
            name:e.data().name
        }))

        res.status(200).send(response)
    }catch(e){
        console.log('Error on get all',e);
        res.status(500).send({error: e});
    }
})

route.delete('/history/:id', async (req: any, res: any) => {
    try{
        const doc = db.collection('history').doc(req.params.id);
        await doc.delete();
        res.status(200).send('Successful deletion')
    }catch(e){
        console.log('Error on deleted', e)
        res.status(500).send({error: e})
    }
})

route.put('/history/:id', async (req: any, res: any) => {
    try{
        const doc = db.collection('history').doc(req.params.id)
        await doc.update({
            name: req.body.name
        })
        res.status(200).send('Seccessful update')
    }catch(e){
        console.log('Error on update',e)
        res.status(500).send({Error: e})
    }
})
   
export default  route;