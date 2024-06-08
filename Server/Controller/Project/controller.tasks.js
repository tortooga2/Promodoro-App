//NOTE: all tasks are found by thier ID. This allows them to be decoupled by the project they are associated with. This file contains functions to create tasks, get tasks, and add tasks to the database.

import { MongoClient } from 'mongodb';
import { SUCCESS, FAILURE } from '../../constants';


const createTasks = async (database, clientID, taskData) => {
    try{
    const result = await database.db(process.env.MONGO_USER_DB)
        .collection('tasks')
        .insertOne(
            {
                clientID: clientID, 
                name: taskData.name, 
                description: taskData.description, 
                tags: taskData.tags,
                dueDate: taskData.dueDate,
                notes: taskData.notes_id
            }
        );
    return SUCCESS;
    } catch (e) {
        console.error(e);
        return FAILURE;
    };
};