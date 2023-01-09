const express = require('express');
const User = require('../models/User');
const app = express();
const router = express.Router()
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



const JWT_SECRET = "yo1324$1242";

// respond with "hello world" when a GET request is made to the homepage
router.post('/create-user', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),// password must be at least 5 chars long
], async (req, res) => {

    let success = false

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists" })
        }

        //using bcrypt to convert pass into hash
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: hash,
            email: req.body.email,
        });
        //taking user id
        const data = {
            user: {
                id: user.id
            }
        }
        //using jwt to generate unique token for user
        const authtoken = jwt.sign(data, JWT_SECRET);

        success = true;

        res.json({success,user,authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must not be blank').exists()
] ,async (req, res) => {

    let success = false

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {

        //if email is not registered
        let user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(400).send({success ,error: "Login with correct details"});
        }

        //if password is incorrect
        let checkPassword = bcrypt.compare(req.body.password, user.password);
        if(!checkPassword){
            res.status(400).send({success ,error:"Login with correct details"});
        }

        //taking user id
        const data = {
            user:{
                id: user.id
            }
        }
        success = true;
        //using jwt to generate unique token for user
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({success,user,authtoken});
        
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
})
router.get("/getusers" , async(req,res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("internal server error");
    }
    
})


module.exports = router;