const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// code for hosting
const BASE_URL=process.env.BASE_URL



// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register user

router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { name, email, age, mobile, work, add, desc } = req.body;

    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        res.status(422).json("Please Fill The Data");
    }

    try {
        const preuser = await users.findOne({ email: email });
        console.log(preuser);

        if (preuser) {
            res.status(422).json("User Already Exist");
        } else {
            const adduser = new users({
                name, email, age, mobile, work, add, desc
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);

    }
})

// get userdata

router.get("/getdata", async (req, res) => {
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);

    }
})

// get individual user

router.get("/getuser/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const userindividual = await users.findById({ _id: id });
        console.log(userindividual);
        res.status(201).json(userindividual);


    } catch (error) {
        res.status(422).json(error);
    }
})

// update user data

router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updateuser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updateuser);
        res.status(201).json(updateuser);

    } catch (error) {
        res.status(422).json(error);

    }
})

// delete user

router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})     
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);

    }

})

module.exports = router;