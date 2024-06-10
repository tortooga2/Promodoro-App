
import { MongoClient } from 'mongodb';

//NOTE: All clients have only one set of tags. Tags are stored in the database as an array of strings. This file contains functions to create tags, get tags, and add tags to the database.




const createTags = async (mongoClient, clientID) => {
    const result = await mongoClient.db(process.env.MONGO_USER_DB).collection('tags').insertOne({clientID: clientID, tags: []});
    console.log("Tags Created");
};

const getTags = async (mongoClient, clientID) => {
    let tags = await mongoClient.db(process.env.MONGO_USER_DB).collection('tags').findOne({clientID: clientID});
    if (tags == null) {
        createTags(mongoClient, clientID);
        return [];
    }
    return tags.tags; 
};

const addTag = async (mongoClient, clientID, tag) => {
    let tags = await getTags(mongoClient, clientID);
    tags.push(tag);
    tags = [...new Set(tags)];
    await monogClient.db(process.env.MONGO_USER_DB).collection('tags').updateOne({clientID: clientID}, {$set: {tags: tags}});
};

export {createTags, getTags, addTag}