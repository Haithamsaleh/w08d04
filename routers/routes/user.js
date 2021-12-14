const express = require('express');
const userRouter = express.Router();
const authentication = require('./../middlewares/authentication')
const authorizathion = require('./../middlewares/authorizathion')

const {resgister,getUsers,login, deletuser,verifyAccount} = require('../controllers/user')

userRouter.post('/resgister',resgister);
userRouter.get('/users',authentication,authorizathion,getUsers);
userRouter.post('/login',login);
userRouter.put('/deluser/:id',authentication,authorizathion,deletuser);
userRouter.post("/verify_account", verifyAccount);

module.exports = userRouter;