const postRoute = require('express').Router();
const {addPost,updatePost,deletePost,getPost,getAllPost} = require("../Controllers/PostControllers");

postRoute.post("/add",addPost)
postRoute.put("/:id",updatePost)
postRoute.delete("/:id",deletePost)
postRoute.get("/:id",getPost)
postRoute.get("/",getAllPost)

module.exports = postRoute