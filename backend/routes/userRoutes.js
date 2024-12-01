const express = require('express')
const userModel = require('../models/user')
const routes = express.Router()
// For hashing password
const bcrypt = require('bcrypt')
// For validation
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const JWT_KEY = 'jwtkey'; 

routes.get('/', (req, res) => {
    res.send('Hello World from User')
})
// User Signup
routes.post('/signup', [
    // validate the user sign up input
    check('username', 'Username is required').notEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password should be at least 6 characters').isLength({min:6})
], async (req, res) => {
    // check for validation errors
    const err = validationResult(req)
    if(!err.isEmpty()){
        return res.status(400).send({ err: err.array() });
    }
    // req.body destructure
    const { username, password, email } = req.body;
    try{
        const userHashedPassword = await bcrypt.hash(password, 10)
        // Create a new user instance
        const user = new userModel({username, email, password: userHashedPassword})

        // Save the user to MongoDB
        const newUser = await user.save()
        // Send a success message
        res.status(201).send({message: "User created successfully",
            "user_id": newUser._id
        })
    }catch (err){
        // Send error message
        res.status(500).send({message: err.message})
    }
})

// User Login Route
routes.post('/login', async (req, res) => {
    const { email, password } = req.body
    try{
        // Find user email
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({status: false, message: 'Invalid Email or password'})
        }
        // Check password
        const isCorrect = await bcrypt.compare(password, user.password)
        if(!isCorrect){
            return res.status(401).json({status: false, message: 'Invalid Email or password'})
        }
        // Send a success message
        const token = jwt.sign({ userId: user._id }, JWT_KEY, { expiresIn: '1h' });
        res.status(200).json({message: "Login successful.",
            token: token 
        })
        
    }catch (err){
        // Send an error message
        res.status(500).json({message: err.message})
    }
})

// Export
module.exports = routes;