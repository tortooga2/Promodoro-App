
import { MongoClient } from 'mongodb';

//NOTE: All clients have only one set of tags. Tags are stored in the database as an array of strings. This file contains functions to create tags, get tags, and add tags to the database.


const createTags = async (database, clientID) => {
    const result = await database.db(process.env.MONGO_USER_DB).collection('tags').insertOne({clientID: clientID, tags: []});
};

const getTags = async (database, clientID) => {
    let tags = await database.db(process.env.MONGO_USER_DB).collection('tags').findOne({clientID: clientID});
    if (tags == null) {
        createTags(database, clientID);
        return [];
    }
    return tags.tags; 
};

const addTag = async (database, clientID, tag) => {
    let tags = await getTags(database, clientID);
    tags.push(tag);
    tags = [...new Set(tags)];
    await database.db(process.env.MONGO_USER_DB).collection('tags').updateOne({clientID: clientID}, {$set: {tags: tags}});
};

export {createTags, getTags, addTag}