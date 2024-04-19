import express from "express";
import dotenv from "dotenv";
import { z } from "zod";
import LoginController from "../Controller/controller.login.js";

import { getClient } from "../Controller/controller.mdb.js";

dotenv.config();
const loginRouter = express.Router();

const loginServer = new LoginController();

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email({ message: "Invalid email format." }),
});

loginRouter.post("/loggingin", async (req, res) => {
  let loginInfo;
  try {
    loginInfo = loginSchema.parse(req.body);
  } catch (error) {
    console.log(error);
    console.log("failed to parse infoJSON");
    return res.status(400).send("Invalid Input");
  }
  let client = getClient();
  if (loginInfo.username) { //TODO: Add Email Login - notice zod test file.
    const result = await loginServer.usernameLogin(loginInfo, client); //loginServer is an instance of the LoginController class
    console.log(result);
    if(result != null){ //null is returned if the password is incorrect
      res.status(200).send("Login Successful. User ID: " + result);
    }
    else{
      res.status(400).send("Login Failed");
    }
  }
});

export default loginRouter;
