const router = require("express").Router();
const User = require('../models/user');
const List = require('../models/list');


//CREATE TASK---------------------------------------------------------------------------------
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById( id );

        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save().then(()=>res.status(200).json({ list })); 
            existingUser.list.push(list);
            await existingUser.save()
        } else {
            return res.status(404).json({ error: "User not found." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

//UPDATE TASK ---------------------------------------------------------------------------------
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findOne(id);

        if (existingUser) {
            const list = await List.findByIdAndUpdate(req.params.id, {title, body});
            list.save().then(()=> res.status(200).json({message: "Task Updated."}));
        } else {
            return res.status(404).json({ error: "User not found." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

// UPDATE STATUS OF A TASK-----------------------------------------------------------------------------
router.put("/updateStatus/:id", async (req, res) => {
    try {
        const { id, completed } = req.body;
        const existingUser = await User.findOne(id);

        if (existingUser) {
            const list = await List.findByIdAndUpdate(req.params.id, {completed});
            list.save().then(()=> res.status(200).json({message: "Task Status Updated."}));
        } else {
            return res.status(404).json({ error: "User not found." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});


//DELETE TASK ----------------------------------------------------------------------------------------
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.body;
        const existingUser = await User.findByIdAndUpdate( id ,{$pull: {list:req.params.id}});

        if (existingUser) {
             await List.findByIdAndDelete(req.params.id)
             .then(()=>res.status(200).json({message:"Task Deleted."}));
        } else {
            return res.status(404).json({ error: "User not found." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});



//GET ALL TASKS OF A USER ---------------------------------------------------------------------------
router.get("/getTask/:id", async (req, res) => {
    try {

        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

        if (list.length > 0) {
            res.status(200).json({ list: list });
        } else {
            res.status(200).json({ message: "No tasks created." });
        }
        
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
