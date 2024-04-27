const express = require("express");
const app = express()
const port = 3000;

const {connectMongodb} = require("./view/connection");
const {logdetail} = require("./middlewares/index")
const userRouter = require('./routes/user');


//connecting mongodb 
connectMongodb("mongodb://localhost:27017/myone");

//middileware 
app.use(express.urlencoded({ extended: false })); 
app.use(logdetail("log.txt"));

//routs
app.use("/users", userRouter)


app.listen(port,  () => {
   console.log(`server stated at port no : ${port}`);
});


