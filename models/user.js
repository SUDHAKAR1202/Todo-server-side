const mongoose = require('mongoose');

//Creating Schema for User

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },

    //when user creates a task, this task's id should be put in the list array
    list:[
        {
            type: mongoose.Types.ObjectId,
            ref: "List"
        }
    ]
      
});

module.exports = mongoose.model("User", userSchema);