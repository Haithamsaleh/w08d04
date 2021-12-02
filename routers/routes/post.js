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
postRouter.put("/delete/:id", deletedPost);
postRouter.put("/post/:id", updatePost);
module.exports = postRouter;
