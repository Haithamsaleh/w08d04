# social media backend


packages used :
nodemon: v2.0.15 ,
mongoose: v6.0.13,
jsonwebtoken: v8.5.1 ,
express: v4.17.1 ,
dotenv: v10.0.0 ,
cors: v2.8.5,
bcrypt: v5.0.1.

install:
I-Clone git clone https://github.com/Haithamsaleh/w08d04.git 
II-for node_modules "npm i"
>>>>>>> a1f22406037d0fb10c630fb0f01c100f38d5824c






## User Storiesa

- **Signup:**  anon can sign up in the app so that  can start log todos
- **Login:**  user  can login to the app so that  can see and edit tasks
- **posts:**  user  can posts to the app and can see athers
- **commint:** user  can commint to posts 
- **like:** user  can like to posts 




# Client / Frontend

## React Router Routes (React App)

| Path             | Component            | Permissions                | Behavior                                                     |
| ---------------- | -------------------- | -------------------------- | ------------------------------------------------------------ |
| `/resgister`              | resgisterPage        | public                     | Home page,  Signup form, link to login                       |
| `/login`         | LoginPage            | public                     | Login form, link to signup,                                  |
| `/post    `     | postpage            | user only                  | Shows all exit points in a list                              |
| `/resgister`              | resgisterPage        | public                     | Home page,  Signup form, link to login                       |

## Components

- LoginPage
- resgisterPage
- postsPage




# Server / Backend

## Models

User model

```
{
   avatar:{type:String },
  username: { type: String, required: true, unique: true },
  email: { type: String,required: true, unique: true },
  password: { type: String, required: true },
  isdel: { type: Boolean, default: false},
  state: {type: String, enum: ["Pending", "Active"],default: "Pending"},
  date: { type: String, default: new Date() },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role",default:"61a73960f1fa8a686b1641c7" },
  passwordCode: {type: String},
  activeCode: {type: String},
  active: {type: String },
}
```


```
 {
  img :{type: String},
  dosc: { type: String, required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  commid: { type: mongoose.Schema.Types.ObjectId, ref: "Comm" },
  date: { type: String, default: new Date() },
  isdel: { type: Boolean, default: false},
  likeId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
   
 }
```



## Backend routes

| HTTP Method | URL            | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/resgister`     | { email,username, password}                                            | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/login`      | {email, password}                                         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/logout` | (empty)                                                      | 204            | 400          | Logs out the user                                            |
| GET        | `/posts`     | { task}                                                    | 200           | 404        | show all posts
| POST        | `/post   | { task}                                            | 201            | 404          |post todo

## Links


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com)

[Server repository Link](https://github.com)

==================
![This is an image](./93.png)


=======








![This is an image](./841.svg)
========================
![This is an image](./84.png)