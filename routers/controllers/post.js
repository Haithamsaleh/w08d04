const postModel = require('../../db/models/post')



const newPost = (req, res) => {
    const {dosc,img,userid} = req.body;

    const newPost = new postModel({
      dosc: dosc,
      img:img,
        userid,
    });
    newPost
    .save()
    .then((result) => {
        res.status(201).json(result);

    })
    .catch((err) => {
        res.status(400).json(err);
    })
}
const allPosts = (req, res) => {
  postModel
      .find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  };
  const deltPost = (req, res) => {
    postModel
    .find({})
    .then((result) => {
    console.log(result);
    result.filter(item=>{
      if(item.isdel == true) 
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
    })
  }
  const getPostById = (req, res) => {
    const { id } = req.params;
    console.log(id);
    postModel
    .findById(id).exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const deletedPost = (req, res) => {
  const { id } = req.params;
  
  console.log(id);
  postModel
  .findByIdAndUpdate(id,{ isDel: true }).exec()
  .then((result) => {
      console.log(result);
      res.status(200).json(result);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};
const updatePost = (req, res) => {
  const { id } = req.params;
  const {dosc} = req.body
  const {img} = req.body
  console.log(id);
  postModel
  .findByIdAndUpdate(id,{ dosc }).exec()
  .then((result) => {
      console.log(result);
      res.status(200).json(result);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};
module.exports = {
  newPost,
  allPosts,
  deltPost,
  getPostById,
  deletedPost,
  updatePost
};
