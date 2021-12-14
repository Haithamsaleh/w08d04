const userModel = require('../../db/models/user')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const SALT = Number(process.env.SALT);
require('dotenv').config();
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const resgister =async (req, res) =>{
    const { username,email ,isdel ,password, role} = req.body;
    const lowerEmail = email.toLowerCase();
    const savedPassword = await bcrypt.hash(password, SALT);
    let activeCode ="";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      activeCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    const newUser = new userModel({
      username,
      email:lowerEmail,
      isdel,
      password: savedPassword,
      activeCode,
      role,
    });
    newUser
    .save()
    .then((result) => {
      transport
          .sendMail({
            from: process.env.EMAIL,
            to: lowerEmail,
            subject: "verify_account",
            html: `<h1>veridy Email </h1>
              <h2>Hi! ${lowerEmail}</h2>
              <h2>CODE: ${activeCode}</h2>
              <p>verify your email by entring the code on the following link</p>
              <a href=https://social-media-project-frontend.herokuapp.com/verify_account/${result._id}> Click here</a>
              </div>`,
          })
          .catch((err) => console.log(err));
        res.status(201).json(result);
      })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const verifyAccount = async (req, res) => {
  const { id, code } = req.body;
  const user = await userModel.findOne({ _id: id });
  console.log(user);
  if (user.activeCode == code) {
    userModel
      .findByIdAndUpdate(id, { state: "Active", activeCode: "" }, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong code..");
  }
};
const checkEmail = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    let passwordCode = "";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      passwordCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    userModel
      .findByIdAndUpdate(user._id, { passwordCode }, { new: true })
      .then((result) => {
        transport
          .sendMail({
            from: process.env.EMAIL,
            to: result.email,
            subject: "Reset Your Password",
            html: `<h1>Reset Your Password</h1>
              <h2>Hi! ${result.username}</h2>
              <h4>CODE: ${passwordCode}</h4>
              <p>Please enter the code on the following link and reset your password</p>
              <a href=https://social-media-project-frontend.herokuapp.com/reset_password/${result._id}> Click here</a>
              </div>`,
          })
          .catch((err) => console.log(err));
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("No user with this email");
  }
};

const resetPassword = async (req, res) => {
  const { id, code, password } = req.body;

  const user = await userModel.findOne({ _id: id });

  if (user.passwordCode == code) {
    const hashedPassword = await bcrypt.hash(password, SALT);

    userModel
      .findByIdAndUpdate(
        id,
        { password: hashedPassword, passwordCode: "" },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong Code...");
  }
};



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
      const {username,email, password} = req.body;
      const SECRET_KEY = process.env.SECRET_KEY;


      userModel
      .findOne({ $or: [{ email }, { username }]})
    .then(async (result) => {
      if (result) {

        if ((result.username == username 
          || result.email == email))
           {
            const payload = {
              role: result.role,
              id: result._id,
            };


          const savedPassword = await bcrypt.compare
           (password, result.password);
          
          if (savedPassword) {
            if (result.state == "Active") {
              const options = {
                expiresIn: "60m",
              };
          let token = jwt.sign(payload, SECRET_KEY, options);
           
          res.status(200).json({ result, token });
        } else { res.status(400).json("please Active your account");} 

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


module.exports ={resgister,getUsers,login,deletuser,verifyAccount,resetPassword,checkEmail}