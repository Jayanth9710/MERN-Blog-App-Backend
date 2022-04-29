const Post = require('../Models/Post');
const User = require("../Models/User");


//Create a new Post.

const addPost = async (req,res) => {
   
   const newPost = new Post(req.body);
   try {
       
    const savedPost = await newPost.save();
    res.status(200).json({
        message:"Post created Successfully!",
        post:savedPost
    })

   } catch (error) {
       res.status(500).json(error)
   } 
}


//Update the post details.

const updatePost = async (req,res) => {
   try {
       const post = await Post.findById(req.params.id)
       if(post.username === req.body.username) {
        try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },
            { new : true }
            );
res.status(200).json({
    message:"Post Updated Successfully!",
    update:updatedPost
})
        } catch (error) {
            res.status(401).json({
                message:"You can Update Only your Post!"
            })
        }
    } else {
        res.status(401).json({
            message:"You can Update Only your Post!"
        })
    }
   } catch (error) {
       res.status(500).json(err)
   }
} 

// Delete the post.

const deletePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username) {
         try {
             await post.delete()
 res.status(200).json({
     message:"Post Deleted Successfully!"
 })
         } catch (error) {
             res.status(401).json({
                 message:"You can Delete Only your Post!"
             })
         }
     } else {
         res.status(401).json({
             message:"You can Delete Only your Post!"
         })
     }
    } catch (error) {
        res.status(500).json(err)
    }
}

// Get specific Post.

const getPost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        console.log(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        
    }
}

// Get all posts

const getAllPost = async (req,res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username) {
            posts= await Post.find({username})
        } else if (catName) {
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        
    }
}

module.exports = {
    addPost,
    deletePost,
    updatePost,
    getPost,
    getAllPost
}