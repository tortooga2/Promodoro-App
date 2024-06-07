
const createTags = async (database, clientID) => {
    database.db(process.env.MONGO_USER_DB).collection('tags').insertOne({clientID: clientID, tags: []});
};

const getTags = async (database, clientID) => {
    let tags = await database.db(process.env.MONGO_USER_DB).collection('tags').findOne({clientID: clientID});
    if (tags == null) {
        createTags(database, clientID);
        return [];
    }
    return tags.tags;
}

export {createTags}