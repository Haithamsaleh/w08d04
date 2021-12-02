const commModel = require('../../db/models/comm')
const postModel = require('../../db/models/post')

const admin = "61a7391ff1fa8a686b1641c5";

const newComm = (req, res) => {
    const {dosc} = req.body;
    const {postid,userid} = req.params

    const newComm = new postModel({
      dosc,
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
  const {_id} = req.params

    commModel
      .findOne({_id: _id})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  const deltComm = (req, res) => {
    commModel
    .findOne({ _id: _id })
    .then((item) => {
      if (item) {
        if (item.user == req.token._id) {
          commModel
            .findOneAndDelete({ _id: _id })
            .then((result) => {
              if (result) {
                res.status(200).json(result);
              } else {
                res.status(404).send("404 not found");
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else if (req.token.role == admin ) {
          commModel
            .findOneAndDelete({ _id: _id })
            .then((result) => {
              if (result) {
                res.status(200).json(result);
              } else {
                res.status(404).send("404 not found");
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else {
          res.status(403).send("forbidden");
        }
      } else {
        res.status(404).send("404 not found");
      }
    });
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
  const { _id } = req.params;
  const {dosc} = req.body
  // console.log(id);
  commModel
  .findOne({ _id: _id })
  .then((item) => {
    // console.log(req.token);
    if (item.user == req.token._id) {
      commModel
        .findOneAndUpdate(
          { _id: _id },
        )
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).send("404 not found");
          }
        });
    } else if (req.token.role == admin ) {
      commModel
        .findOneAndUpdate(
          { _id: _id },
        )
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).send("not found");
          }
        });
    } else {
      res.status(404).send("forbidden");
    }
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
