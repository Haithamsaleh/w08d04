const express= require("express")
const{
    newComm,
    allComm,
    deltComm,
    getCommById,
    deletedComm,
    updateComm
} = require("./../controllers/comm")
const commRouter = express.Router();

commRouter.post("/comm/:userId/:postId", newComm);
commRouter.get("/comm/:id", getCommById);
commRouter.get("/comms", allComm);
commRouter.put("/delcomm/:id", deltComm);
commRouter.delete("/deletecomm/:_id", deletedComm);
commRouter.put("/comm/:id", updateComm);
module.exports = commRouter;
