const router = require("express").Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs"); //used for encrypting the password

//SIGN UP------------------------------------------------------------------------------
router.post("/signup", async(req,res)=>{
    try {
        const { username, email, password} = req.body;

        const hashpassword = bcrypt.hashSync(password);
        const user = new User({username, email, password: hashpassword});
        await user.save()
        .then(()=>res.status(200).json({message:"Sign Up Successful!"}));

    } catch (error) {
        res.status(200).json({message: "User already exists!"});
    }
});

//LOG IN----------------------------------------------------------------------------------
router.post("/login", async (req, res) => {
    try {

        //If Email is Wrong
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ message: "No Such Account Found!" });
        }

        //If Password is Wrong
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Password is incorrect!" });
        }

        //storing every detail of user except the password in 'others' array
        const { password, ...others } = user._doc;
        return res.status(200).json({ others, message:"Login Successful!" }); 

    } catch (error) {
        res.status(200).json({ message: "An error occurred!" });
    }
});

module.exports = router;