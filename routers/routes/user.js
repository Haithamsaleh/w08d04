const express = require('express');
const userRouter = express.Router();
const authentication = require('./../middlewares/authentication')
const authorizathion = require('./../middlewares/authorizathion')

const {resgister,getUsers,login} = require('../controllers/user')

userRouter.post('/resgister',resgister);
userRouter.get('/users',authorizathion,authentication,getUsers);
userRouter.post('/login',login);

module.exports = userRouter;