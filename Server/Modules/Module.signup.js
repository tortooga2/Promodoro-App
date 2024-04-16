import express from 'express';
import dotenv from 'dotenv';
import SignUpController from '../Controller/controller.signup.js';

import { getClient } from '../Controller/controller.mdb.js';

dotenv.config();
const signUpRouter = express.Router();

const signUpController = new SignUpController();

signUpRouter.post('/createUser', async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).send("Missing Required Information");
    }
    
    let client = getClient();
    console.log("Client: " + client);
    let user = await signUpController.isUserCreatedbyUsername(req.body, client);
    let email = await signUpController.isUserCreatedbyEmail(req.body, client);
    if(user){
        console.log("Checking for username" + user);
        return res.status(400).send("Username Already Exists");
    }
    if(email){
        console.log("Checking for email" + email);
        return res.status(400).send("Email Already Exists");
    }
    console.log("Creating User")
    signUpController.createUser(req.body, client);
    res.status(200).send("User Created");
    
});


export default signUpRouter;