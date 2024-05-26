import express from "express";
import dotenv from "dotenv";
import { z } from "zod";
import LoginController from "../Controller/Auth/controller.login.js";
import { getClient } from "../Controller/controller.mdb.js";
import { loginSchema } from "../Schema/schema.loginInfo.js";

dotenv.config();
const loginRouter = express.Router();

const loginServer = new LoginController();

loginRouter.post("/loggingin", async (req, res) => {
  let client = getClient();
  let loginInfo;

  try {
    loginInfo = loginSchema.parse(req.body);
  } catch (error) {
    console.log(error);
    console.log("failed to parse infoJSON");
    return res.status(400).send("Invalid Input");
  }

  if (!loginInfo.username) {
    //TODO: Add Email Login - notice zod test file.
    return res.status(400).send("Invalid Input");
  }

  const result = await loginServer.usernameLogin(loginInfo, client); //loginServer is an instance of the LoginController class

  if (result != null) {
    //null is returned if the password is incorrect
    console.log("Login Successful");
    return res.status(200).send("Login Successful. User ID: " + result);
  } else {
    console.log("Failed attempt to login");
    return res.status(400).send("Login Failed");
  }
});

export default loginRouter;
