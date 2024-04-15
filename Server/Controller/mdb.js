import { MongoClient } from "mongodb";

import dotenv from 'dotenv'
dotenv.config()

const db = MongoClient.connect()


class MDBController{
    constructor(){
        this.client = new MongoClient(process.env.MONGO_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                depricationErrors: true
            }
        });

        this.connect();
    }

    connect = async () => {
        try {
            console.log("Connecting to Database");
            await this.client.connect();
            console.log("Connected to Database");
        } catch (error) {
            console.log(error);
        }
    }


    getByKey = (key) =>{
             
    }

    add_value = () => {
        
    }

}

export default MDBController;