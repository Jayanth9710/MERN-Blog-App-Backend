const User = require("../Models/User");
const Post = require('../Models/Post')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const mongodb = require ("mongodb");

//Registering the user.

const registerUser =  (req, res) => {
    const {username,email,password} =req.body;
      User.findOne({email:email})
    .then((savedUser)=>{
      if (savedUser) {
        res.status(403).json({
          message: "Email is already registered.",
          
        });
      } else {
        // Hash the password
        let salt =  bcrypt.genSaltSync(10);
        let hash =  bcrypt.hashSync(password, salt);
        
  
        // Confirm registration.
        const newUser = new User({ 
          username:username,
          email:email,
          password:hash
        })
  
        // Save user and send Response.
          newUser.save();
  
        res.json({
          message: "User registered successfully.",
        });
      }

    })
  .catch(err=>{
    console.log(err)
  })
}

//Login for user.

// Login.

const loginUser = async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
  
      if (user) {
        let validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (validPassword) {
          // Generate JWT token
          let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          res.status(200).json(user);
        } else {
          res.status(403).json({
              message: "Username/Password is incorrect"
          })
        }
      } else {
          res.status(404).json({
              message: "No user Found.",
            });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  //Update the user details.

const updateUser = async (req,res) => {
    if (req.body.userId === req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true});

            res.status(200).json(updatedUser)

        } catch (error) {
            res.status(500).json({
                message:"Something went wrong"
            });
        }
    } else {
        res.status(401).json({
            message:"You can update only your Account!"
        })
    }
}

// Delete the user.

const deleteUser = async (req,res) => {
    if (req.body.userId === req.params.id) {

        try {
            const user = await User.findById(req.params.id)
        try {
            await Post.deleteMany({username: user.username})
            await User.findByIdAndDelete(req.params.id)

            res.status(200).json("User has been deleted")

        } catch (error) {
            res.status(500).json({
                message:"Something went wrong"
            });
        }
    } catch (err) {
        res.status(404).json("User Not Found")
    }
    } else {
        res.status(401).json({
            message:"You can delete only your Account!"
        })
    }
}

// Get specific User.

const getUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc
        res.status(200).json(others)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUser
}