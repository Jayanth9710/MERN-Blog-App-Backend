const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({

    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:Object,
        required:false
    },
    username:{
        type:String,
        required:true,
    },
    categories:{
        type:Array,
        required:false,
    }
},
{ timestamps : true }
);

module.exports = mongoose.model("Post",PostSchema)