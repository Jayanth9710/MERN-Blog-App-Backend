const User = require("../Models/User");
const Category = require("../Models/Category")

// Add new Category
const newCategory = async (req,res) => {
    const newCat = new Category(req.body);

    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat)
    } catch (err) {
        res.status(500).json(err)
    }
}

// List all Categories

const allCategories = async (req,res) => {
    try {
        const cats = await Category.find()
        res.status(200).json(cats)
    } catch (err) {
        res.status(500).json(err)
    }
}



module.exports = {
    newCategory,
    allCategories
}