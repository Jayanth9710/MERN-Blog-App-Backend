const AuthRoute = require('express').Router();
const User = require("../Models/User");
const {registerUser,loginUser} = require('../Controllers/UserControllers');


// Registering the user

AuthRoute.post("/register",registerUser)
AuthRoute.post("/login",loginUser)

module.exports = AuthRoute