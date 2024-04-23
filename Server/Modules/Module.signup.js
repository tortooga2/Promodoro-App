import express from "express";
import dotenv from "dotenv";
import { z } from "zod";
import SignUpController from "../Controller/Auth/controller.signup.js";

import { getClient } from "../Controller/controller.mdb.js";

dotenv.config();
const signUpRouter = express.Router();

const signUpController = new SignUpController();

const infoSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
  email: z.string().email({ message: "Invalid email format." }),
});

const createSchema = (i) => {
  try {
    let newUser = infoSchema.parse(i);
    return newUser;
  } catch (error) {
    console.log(error);
    console.log("failed to parse infoJSON: 27");
    return false;
  }
};

signUpRouter.post("/createUser", async (req, res) => {
  let userinfo = createSchema(req.body);
  if (!userinfo) {
    return res.status(400).send("Invalid Input");
  }
  let client = getClient();

  let isUserUnique = await signUpController.isUserCreatedbyUsername(
    userinfo.username,
    client,
  );
  let isEmailUnique = await signUpController.isUserCreatedbyEmail(
    userinfo.email,
    client,
  );
  if (isUserUnique) {
    console.log("Checking for username" + isUserUnique);
    return res.status(400).send("Username Already Exists");
  }
  if (isEmailUnique) {
    console.log("Checking for email" + isEmailUnique);
    return res.status(400).send("Email Already Exists");
  }
  console.log("Creating User");
  signUpController.createUser(userinfo, client);
  res.status(200).send("User Created");
});

export default signUpRouter;
