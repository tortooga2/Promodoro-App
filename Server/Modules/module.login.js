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

loginRouter.post("/login", async (req, res) => {
  try {
    const loginInfo = loginSchema.parse(req.body);
  } catch (error) {
    console.log(error);
    console.log("failed to parse infoJSON");
    return res.status(400).send("Invalid Input");
  }
  let client = getClient();
  if (loginInfo.username) {
    //TODO: Implement based on ZOD test.
  }
});

export default loginRouter;
