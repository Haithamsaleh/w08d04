const commModel = require('../../db/models/comm')



const newComm = (req, res) => {
    const {postid,dosc,userid} = req.body;

    const newComm = new postModel({
      dosc: dosc,
      postid,
        userid,
    });
    newComm
    .save()
    .then((result) => {
        res.status(201).json(result);

    })
    .catch((err) => {
        res.status(400).json(err);
    })
}
const allComm = (req, res) => {
    commModel
      .find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  };
  const deltComm = (req, res) => {
    commModel
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
  const getCommById = (req, res) => {
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
const deletedComm = (req, res) => {
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
const updateComm = (req, res) => {
  const { id } = req.params;
  const {dosc} = req.body
  console.log(id);
  commModel
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
  newComm,
  allComm,
  deltComm,
  getCommById,
  deletedComm,
  updateComm
};
