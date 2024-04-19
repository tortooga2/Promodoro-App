import { MongoClient, ServerApiVersion } from "mongodb";


let client;

export async function connectDB(){
    if(!client){
        console.log("Attempting to Connect to Database");
        client = new MongoClient(process.env.MONGO_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                depricationErrors: true
            }
        });

        await client.connect();
        console.log("Connected to Database");
        
    }
    else{
        console.log("Client Already Connected");
    }
}

export function checkConnection(){
    return !!client && !!client.topology && client.topology.isConnected()

}

export function getClient(){
    if(!client){
        throw new Error("Client Not Connected");
    }
    return client;
}