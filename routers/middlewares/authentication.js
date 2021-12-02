const jwt = require('jsonwebtoken')
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY

const authentication = (req, res, next) => {
  try{    
      // console.log(req.headers.authorization.split(" ")[1],"token");
      // console.log(req.headers.authorization);
           if (!req.headers.authorization){
              res.status(403).json({ message: "forbidden" })

           } else { 
          
            // console.log(req.headers.authorization.split(' ')[1])
            const token = req.headers.authorization.split(" ")[1]
          const porsedToken = jwt.verify(token, SECRET_KEY)
       req.token = porsedToken ;
      //  console.log(token);
      //  console.log(porsedToken);
       next();
          }

} catch(error){
  console.log(error)
    res.status(403).json(error)
}
};
module.exports = 
 authentication 
;