import { MongoClient } from "mongodb";
import bycrypt from "bcrypt";
import { z } from "zod";
import { signUpSchema } from "../../Schema/schema.loginInfo.js";
import {createTag} from "../Project/controller.tags.js";

//infoJSON should have the fallowing properties: username, password, email
const saltRounds = 10;

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

class SignUpController {
  createUser = async (newUser, client) => {
    // let newUser = createSchema(infoJSON);
    // if (!newUser) {
    //   console.log("failed to parse user.");
    //   return;
    // }
    let salt = await bycrypt.genSalt(saltRounds);
    let hash = await bycrypt.hash(newUser.password, salt);

    newUser.password = hash;
    salt = await bycrypt.genSalt(saltRounds);
    newUser.userID = await bycrypt.hash(newUser.username, salt);

    client
      .db(process.env.MONGO_USER_DB)
      .collection("users")
      .insertOne(newUser, (err, result) => {
        if (err) throw err;
        console.log("User Created");
      });
    await createTag(newUser.userID);
    
  };

  isUserCreatedbyUsername = async (username, client) => {
    let user = await client
      .db(process.env.MONGO_USER_DB)
      .collection("users")
      .findOne({ username: username });
    if (user == null) {
      console.log("No User was found by username");
      return false;
    }
    console.log("User was found by username");
    return true;
  };

  isUserCreatedbyEmail = async (email, client) => {
    let user = await client
      .db(process.env.MONGO_USER_DB)
      .collection("users")
      .findOne({ email: email });
    if (user == null) {
      console.log("No User was found by email.");
      return false;
    }
    console.log("User was found by email.");
    return true;
  };
}

export default SignUpController;
