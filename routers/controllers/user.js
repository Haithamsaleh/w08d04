const userModel = require('../../db/models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { options } = require("../routes/role");
const SALT = Number(process.env.SALT);
require('dotenv').config();

const resgister =async (req, res) =>{
    const { username,email ,isdel ,password, role} = req.body;

    const savedPassword = await bcrypt.hash(password, SALT);

    const newUser = new userModel({
      username,
      email,
      isdel,
      password: savedPassword,
      role,
    });
    newUser
    .save()
    .then((result) =>{
        res.status(201).json(result);
    })
.catch((err) =>{
    res.status(400).json(err);
})
}
const getUsers = (req, res) => {
    userModel
      .find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  };

  const login = (req, res) => {
      const {username, password} = req.body;
      const SECRET_KEY = process.env.SECRET_KEY;


      userModel
      .findOne({ username })
    .then(async (result) => {
      if (result) {
        // console.log(result);
        if (result.username == username) {
          const savedPassword = await bcrypt.compare(password, result.password);
          
          if (savedPassword) {
            const payload = {
              role: result.role
            }
            options={
              expiresIn:"60m"
          }
          let token = jwt.sign(payload, SECRET_KEY, options);
          // req.token = token
          // console.log(req.token);
            res.status(200).json({ result, token });
          } else {
            res.status(400).json("wrong name or password");
          }
        } else {
          res.status(400).json("wrong name or password");
        }
      } else {
        res.status(404).json("name not exist");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
  const deletuser = (req, res) => {
    const { id } = req.params;
    userModel
      .findByIdAndUpdate(id, { $set: { isdel: true } }).exec()
      .then((result) => {
        console.log(result);
        if (result) {
          res.status(200).json("user removed");
        } else {
          res.status(404).json("user does not exist");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
};


module.exports ={resgister,getUsers,login,deletuser}