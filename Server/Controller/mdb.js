import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()




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

    isConnected() {
        return !!this.client && !!this.client.topology && this.client.topology.isConnected()
    }

    getDBStatus = async () => {
        try {
            let status = await this.client.db("Cluster0").serverConfig.isConnected();
            return status;
        } catch (error) {
            console.log(error);
        }
    }

}

export default MDBController;