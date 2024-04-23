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
      return "no user found";
    } else {
      let result = await bycrypt.compare(password, user.password);
      console.log(result);
      if (result) {
        return this.JWTController.createJWT({ clientID: user.userID });
      } else {
        return null;
      }
    }
  };
}

export default LoginController;
