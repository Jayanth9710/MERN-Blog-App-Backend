const categoryRoute = require('express').Router();
const {newCategory,allCategories} = require('../Controllers/CategoriesControllers');

categoryRoute.post("/addCategory",newCategory)
categoryRoute.get("/",allCategories)

module.exports = categoryRoute