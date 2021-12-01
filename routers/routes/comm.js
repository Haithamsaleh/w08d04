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

commRouter.post("/comm", newComm);
commRouter.get("/comm/:id", getCommById);

commRouter.get("/comms", allComm);
commRouter.get("/delcomm", deltComm);
commRouter.delete("/delete/:id", deletedComm);
commRouter.put("/comm/:id", updateComm);
module.exports = commRouter;
