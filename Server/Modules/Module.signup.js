import express from 'express';
import dotenv from 'dotenv';
import SignUpController from '../Controller/controller.signup.js';

import { getClient } from '../Controller/controller.mdb.js';

dotenv.config();
const signUpRouter = express.Router();

const signUpController = new SignUpController();

signUpRouter.post('/createUser', (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send("Missing Required Information");
    };
    let client = getClient();
    console.log("Client: " + client);
    signUpController.createUser(req.body, client);
    res.status(200).send("User Created");
});


export default signUpRouter;