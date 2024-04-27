const express = require("express");
const app = express()
const port = 3000;

const userRouter = require('./routes/user');
const {connectMongodb} = require("./view/connection");
const {logdetail} = require("./middlewares/index")


//connecting mongodb 
connectMongodb("mongodb://localhost:27017/myone");

//middileware - plugin
app.use(express.urlencoded({ extended: false })); 
app.use(logdetail("log.txt"));

//routs
app.use("/users", userRouter)


app.listen(port,  () => {
   console.log(`server stated at port no : ${port}`);
});


