const mongoose = require('mongoose');

//Creating Schema for tasks

const listSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    
    //when task is created, corresponding user's id should be put in this user array
    user:[
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ]
    
},{timestamps: true});

module.exports = mongoose.model("List", listSchema);