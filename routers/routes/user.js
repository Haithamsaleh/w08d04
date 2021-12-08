const express = require('express');
const userRouter = express.Router();
const authentication = require('./../middlewares/authentication')
const authorizathion = require('./../middlewares/authorizathion')

const {resgister,getUsers,login, deletuser} = require('../controllers/user')

userRouter.post('/resgister',resgister);
userRouter.get('/users',getUsers);
userRouter.post('/login',login);
userRouter.put('/deluser/:id',authentication,authorizathion,deletuser);

module.exports = userRouter;