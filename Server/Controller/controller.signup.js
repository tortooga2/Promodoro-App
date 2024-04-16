import { MongoClient } from "mongodb";
import bycrypt from "bcrypt";




//infoJSON should have the fallowing properties: username, password, email
const saltRounds = 10;

class SignUpController{
    createUser = async (infoJSON, client) => { 
        let newUser = {
            username: "",
            email: "",
            password: "",
            userID: ""
        };
        const salt = await bycrypt.genSalt(saltRounds);
        const hash = await bycrypt.hash(infoJSON.password, salt);

        newUser.username = infoJSON.username;
        newUser.email = infoJSON.email;
        newUser.password = hash;
        newUser.userID = await bycrypt.hash(infoJSON.email, salt);


        client.db(process.env.MONGO_USER_DB).collection("users").insertOne(newUser, (err, result) => { 
            if(err) throw err;
            console.log("User Created");
        });

    };


    isUserCreatedbyUsername = async (newUserJson, client) => {
        let user = await client.db(process.env.MONGO_USER_DB).collection("users").findOne({email: newUserJson.username});
        if(user){
            return true;
        }
        return false;
    }
    isUserCreatedbyEmail = async (newUserJson, client) => {
        let user = await client.db(process.env.MONGO_USER_DB).collection("users").findOne({email: newUserJson.email});
        if(user){
            return true;
        }
        return false;
    }
}

export default SignUpController;
