const postModel = require('../../db/models/post')



const newPost = (req, res) => {
  const {_id} = req.params
    const {dosc,img} = req.body;

    const newPost = new postModel({
      dosc: dosc,
      img:img,
        
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
    const {_id}= req.params
    postModel
    .findOne({_id})
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
    const { _id } = req.params;
    console.log(_id);
    postModel
    .findOne(_id).exec()
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
  .findByIdAndUpdate(id,{ isdel: true }).exec()
  .then((result) => {
      console.log(result);
      res.status(200).json(result);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};

const updatePost = (req, res) => {
  const { dosc } = req.body;
  const { id } = req.params;
  postModel
    .findByIdAndUpdate(id, { $set: { dosc: dosc } })
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
