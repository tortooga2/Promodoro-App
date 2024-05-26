import express from "express";
import dotenv from "dotenv";
import { z } from "zod";
import SignUpController from "../Controller/Auth/controller.signup.js";
import { getClient } from "../Controller/controller.mdb.js";
import { signUpSchema } from "../Schema/schema.loginInfo.js";

dotenv.config();
const signUpRouter = express.Router();

const signUpController = new SignUpController();

const createSchema = (i) => {
  try {
    let newUser = signUpSchema.parse(i);
    return newUser;
  } catch (error) {
    console.log(error);
    console.log("failed to parse infoJSON: 27");
    return false;
  }
};

signUpRouter.post("/createUser", async (req, res) => {
  let client = getClient();
  let userinfo = createSchema(req.body);

  if (!userinfo) {
    return res.status(400).send("Invalid Input");
  }

  let isUserUnique = await signUpController.isUserCreatedbyUsername(
    userinfo.username,
    client,
  );
  if (isUserUnique) {
    console.log("Checking for username " + isUserUnique);
    return res.status(400).send("Username Already Exists");
  }
  let isEmailUnique = await signUpController.isUserCreatedbyEmail(
    userinfo.email,
    client,
  );
  if (isEmailUnique) {
    console.log("Checking for email " + isEmailUnique);
    return res.status(400).send("Email Already Exists");
  }
  console.log("Creating User");
  signUpController.createUser(userinfo, client);
  res.status(200).send("User Created");
});

export default signUpRouter;
