import express from "express";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import {
  connectDB,
  getClient,
  checkConnection,
} from "./Controller/controller.mdb.js";


import signUpRouter from "./Modules/module.signup.js";
import loginRouter from "./Modules/module.login.js";
import tagsRouter from "./Modules/module.tags.js";

dotenv.config();

const app = express();
app.use(express.json());

let client;

connectDB()
  .then(() => {
    client = getClient();
  })
  .catch((error) => {
    throw error;
  });

app.get("/", (req, res) => {
  console.log("Server Healthy!");
  res.status(200).send("Heard Response: " + checkConnection());
});

//ENDPOINTS//
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/tags", tagsRouter);

const RunningCallback = () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
};

app.listen(process.env.PORT, RunningCallback);
