import express from 'express';
import dotenv from 'dotenv';

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
    if (!req.body.tag) {
        return res.status(400).send("Invalid Input");
    }
    await addTag(client, req.body.clientID, req.body.tag);
    return res.status(200).send("Tag Added");
});

export default tagsRouter;
