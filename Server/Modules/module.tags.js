import express from 'express';
import { getTags, addTag } from '../Controller/Project/controller.tags.js';
import { getClient } from '../Controller/controller.mdb.js';


dotenv.config();

const tagsRouter = express.Router();

tagsRouter.get('/getTags', async (req, res) => {
    let client = getClient();
    let tags = await getTags(client, req.body.clientID);
    return res.status(200).send(tags);
});

tagsRouter.post('/addTag', async (req, res) => {
    let client = getClient();
    await addTag(client, req.body.clientID, req.body.tag);
    return res.status(200).send("Tag Added");
});

export default tagsRouter;
