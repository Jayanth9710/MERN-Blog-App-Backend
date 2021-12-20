const userRoute = require('express').Router()
const {updateUser,deleteUser,getUser} = require('../Controllers/UserControllers')



userRoute.put('/:id',updateUser);
userRoute.delete('/:id',deleteUser);
userRoute.get('/:id',getUser)



module.exports = userRoute