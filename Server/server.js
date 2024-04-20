import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
//import MDBController from './Controller/mdb(Depricated).js';
import {connectDB, getClient, checkConnection} from './Controller/controller.mdb.js';
import signUpRouter from './Modules/module.signup.js';
import loginRouter from './Modules/module.login.js';


dotenv.config();

const app = express();
app.use(express.json());

let client;

connectDB().then( () => { client = getClient() }).catch((error) => {throw error});


app.get('/', (req, res)=>{
    console.log("Server Healthy!");
    res.status(200).send("Heard Response: " + checkConnection());
});

app.use('/signup', signUpRouter);
app.use('/login', loginRouter);

const RunningCallback = () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
}

app.listen(process.env.PORT, RunningCallback);



// app.get('/server', async (req, res) => {
//     try{
//         let value = await getMoveie({title: `${req.query.title}`});
//         console.log(value);
//         if(!value){
//             res.status(404).send("Movie not found");
//         }
//         res.status(200).send(value.imdb);
//     } catch (error) {
//         console.log(error);
//     }
// });






//how do i use the env variable in the code



//example get request that will render a view
// app.get('/view', (req, res) => {
//     res.render('index', {title: 'Express'});
// })

