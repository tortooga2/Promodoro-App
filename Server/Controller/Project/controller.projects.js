
import { MongoClient } from "mongodb";
import { getTags, addTag } from "./controller.tags";
import { SUCCESS, FAILURE } from "../../constants";


const createProjects = async (database, clientID, projectData) => { //ProjectData is represented as a JSON object with the following keys: name, description, tags, and tasks
    try{
        const result = await database.db(process.env.MONGO_USER_DB)
        .collection('projects')
        .insertOne(
            {clientID: clientID, 
                name: projectData.name, 
                description: projectData.description, 
                tags: projectData.tags, 
                tasks: projectData.tasks_id,//tasks_id is an array of ObjectIDs. Each ObjectID corresponds to a task in the tasks collection.
                notes: projectData.note_id} //notes_id is an array of ObjectIDs. Each ObjectID corresponds to a task in the tasks collection.
        );
        const tags = await getTags(database, clientID);
        projectData.tags.forEach(tag => {
            if (!tags.includes(tag)) {
                addTag(database, clientID, tag);
            }
        });
        return SUCCESS;

    } catch (e) {
        console.error(e);
        return FAILURE;
    }
}

const getAllProjects = async (database, clientID) => {
    try{
        const projects = await database.db(process.env.MONGO_USER_DB)
        .collection('projects')
        .find({clientID: clientID})
        .toArray();
        return projects;
    } catch (e) {
        console.error(e);
        return FAILURE;
    }
}

const getProjectsByTag = async (database, clientID, tag) => {
    try{
        const projects = await database.db(process.env.MONGO_USER_DB)
        .collection('projects')
        .find({clientID: clientID, tags: tag})
        .toArray();
        return projects;
    } catch (e) {
        console.error(e);
        return FAILURE;
    }
}

const updateProject = async (database, clientID, projectID, projectData) => {
    try{
        const result = await database.db(process.env.MONGO_USER_DB)
        .collection('projects')
        .updateOne(
            {clientID: clientID, _id: projectID},
            {$set: projectData}
        );
        return SUCCESS;
    } catch (e) {
        console.error(e);
        return FAILURE;
    }
}

const deleteProject = async (database, clientID, projectID) => {
    try{
        const result = await database.db(process.env.MONGO_USER_DB)
        .collection('projects')
        .deleteOne(
            {clientID: clientID, _id: projectID}
        );
        return SUCCESS;
    } catch (e) {
        console.error(e);
        return FAILURE;
    }

}

export {createProjects, getAllProjects, getProjectsByTag, updateProject, deleteProject}
// Path: Server/Controller/Project/controller.tags.js
