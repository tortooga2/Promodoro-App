import { MongoClient } from "mongodb";
import bycrypt from "bcrypt";
import { z } from "zod";

//infoJSON should have the fallowing properties: username, password, email
const saltRounds = 10;

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

    console.log(newUser);
    client
      .db(process.env.MONGO_USER_DB)
      .collection("users")
      .insertOne(newUser, (err, result) => {
        if (err) throw err;
        console.log("User Created");
      });
  };

  isUserCreatedbyUsername = async (username, client) => {
    let user = await client
      .db(process.env.MONGO_USER_DB)
      .collection("users")
      .findOne({ username: username });
    if (user == null) {
      return false;
    }
    return true;
  };
  isUserCreatedbyEmail = async (email, client) => {
    let user = await client
      .db(process.env.MONGO_USER_DB)
      .collection("users")
      .findOne({ email: email });
    console.log(user);
    if (user == null) {
      return false;
    }
    return true;
  };
}

export default SignUpController;
