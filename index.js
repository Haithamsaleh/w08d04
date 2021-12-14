const express=require('express')
require('dotenv').config();
const cors = require('cors')
const db = require('./db')

const app = express()
app.use(express.json())
app.use(cors());




const roleRouter = require("./routers/routes/role");
app.use(roleRouter);
const userRouter = require("./routers/routes/user")
app.use(userRouter);
const postRouter = require("./routers/routes/post")
app.use(postRouter);
const commRouter = require("./routers/routes/comm")
app.use(commRouter);
// const likeRouter = require('./routers/routes/like');
// app.use(likeRouter);




const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> {
 console.log(`server on port ${PORT}`);
})