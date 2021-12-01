const express = require('express');
const roleRouter = express.Router();

const {createRole,Roles} = require('../controllers/role')

roleRouter.post('/create',createRole);
roleRouter.get('/roles', Roles);

module.exports = roleRouter;