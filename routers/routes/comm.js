const express= require("express")
const authentication = require('./../middlewares/authentication')
const authorizathion = require('./../middlewares/authorizathion')
const{
    newComm,
    allComm,
    deltComm,
    getCommById,
    deletedComm,
    updateComm
} = require("./../controllers/comm")
const commRouter = express.Router();

commRouter.post("/comm/:userId/:postId",authentication, newComm);
commRouter.get("/comm/:id", authentication,getCommById);
commRouter.get("/comms",authentication,authorizathion, allComm);
commRouter.put("/delcomm/:id",authentication,authorizathion, deltComm);
commRouter.delete("/deletecomm/:_id",authentication,authorizathion, deletedComm);
commRouter.put("/comm/:id",authentication,authorizathion, updateComm);
module.exports = commRouter;
