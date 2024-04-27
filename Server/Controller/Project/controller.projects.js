import mongoose from "mongoose";

/* 
    Overview of projects schema:
Project:
    - Header: stuff used to query the database on load.
        - _id: the id of the project
        - clientID: the id of the client
    - Queryables: stuff used to query the database when sorting or filtering.
    If I want to filter by tags, or sort by date.
        - project_tags: an array of tags that are associated with the project
        - Content: the actual content of the project
        - project_title: the title of the project
        - project_description: the description of the project
        - notes_ref: an array of references to notes that are associated with the project
            - Note:
                - Header: stuff used to query the database on load.
                    - _id: the id of the note
                    - clientID: the id of the client
                    - project_id: the id of the project
                - Queryables: stuff used to query the database when sorting or filtering.
                    - note_tags: an array of tags that are associated with the note
                    - note_date: the date the note was created
                - Content: the actual content of the note
                    - note_title: the title of the note
                    - note_content: the content of the note
    When the user logs in, the project list will be retrieved with tags.
    Then when user clicks on a project, the notes will be retrieved by thier '_id' and stored in the client.
    When the user adds a tag to a note or project, the tag will be added to the user's tag list. This must be done
        in a closed loop to ensure parity between the user's tags and the project's tags.
            





*/



//tags will be stored in a single entry in the database
//each user will have only one entry in the database
//upon the creation of a tag, it will be added to the user's tag list
//upon login, the user's tag list will be retrieved and stored in the client
const TagSchema = mongoose.Schema({
    tag_name: String,
    tag_color: String
});

//stored in seperate collection
//notice, that the tag schema is nested within the note schema
//this is not dependent on the users tags, but is a separate entity
//So parity between notes tags and users tags is important.
const NoteSchema = mongoose.Schema({
    header: {
        '_id': mongoose.Schema.Types.ObjectId,
        clientID: String,
        project_id: String
    },
    queryables: {
        note_tags: [TagSchema],
        note_date: Date
    },
    content: {
        note_title: String,
        note_content: String
    }
});

//notes will be stored by reference in the project schema.
//notes, themselves, will be stored in a separate collection.
//this ensures they are accesable by the user, but not directly tied to the project
const ProjectSchema = mongoose.Schema({
    header:{
        '_id': mongoose.Schema.Types.ObjectId,
        clientID: String
    },
    queryables: {
        project_tags: [TagSchema],
        status: String,
        due_date: Date
    },
    content: {
        project_title: String,
        project_description: String,
        notes_ref: [NoteSchema._id]
    }
});

