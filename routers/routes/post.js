const express= require("express")
const{
  newPost,
  allPosts,
  deltPost,
  getPostById,
  deletedPost,
  updatePost
} = require("./../controllers/post")
const postRouter = express.Router();

postRouter.post("/post", newPost);
postRouter.get("/post/:id", getPostById);

postRouter.get("/posts", allPosts);
postRouter.get("/deltask", deltPost);
postRouter.delete("/delete/:id", deletedPost);
postRouter.put("/task/:id", updatePost);
module.exports = postRouter;
