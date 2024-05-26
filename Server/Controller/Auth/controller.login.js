import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bycrypt from "bcrypt";

import JWTController from "./controller.jwt.js";

class LoginController {
  constructor() {
    this.JWTController = new JWTController({ secret: process.env.JWT_SECRET });
  }

  usernameLogin = async (loginInfo, client) => {
    const username = loginInfo.username;
    const password = loginInfo.password;

    let user = await client
      .db(process.env.MONGO_USER_DB)
      .collection("users")
      .findOne({ username: username });
    if (user == null) {
      console.log("No User was found by username");
      return null;
    } else {
      let result = await bycrypt.compare(password, user.password);
      if (result) {
        console.log("User login was varified by Bcrypt");
        return this.JWTController.createJWT({ clientID: user.userID });
      }
      return null;
    }
  };
}

export default LoginController;
