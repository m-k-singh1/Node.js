const express = require("express");
const app = express();
const port = 3000;

const users = require("./MOCK_DATA.json");
const fs = require('fs');

const mongoose = require("mongoose");

//connecting mongodb 
mongoose
.connect("mongodb://localhost:27017/my-website")
.then(()=> console.log(`mongodb connected`))
.catch((err)=> console.log("error occur",err))

//schema for mongo db
const userschema = new mongoose.Schema({      //.schema is biltin function
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   gender: {
      type: String,
   },
   jobTitle: {
      type: String,
   }
});
const myuser = mongoose.model("users",userschema)


//middileware - plugin
app.use(express.urlencoded({ extended: false }));

//my middleware

app.use((req,res, next) => {
   fs.appendFile("log.txt",`\n${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`, (err,data) => {
      console.log(`its a middilware 2`);
      next()
   });
});

//routs
app.get("/",(req,res)=> {
   return res.json("its a home page")
})
app.get("/users",  (req,res) => {
   return res.json(users);
});
app.post("/users",  (req,res) => {
   const body = req.body;
   users.push({ ...body, id: users.length + 1 });
   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err, data) => {
       return res.json({ status: "sucess", id: users.length});
   });
});

app
.route("/users/:id")
.get((req,res)=> {
   const id = Number(req.params.id);
   const user = users.find( (user) => user.id === id );
   return res.json(user)
})
.patch( (req,res) => {
   return  res.json( { status : "panding"});
})
.delete( (req,res) => {
   const id = parseInt(req.params.id);
   const userIndex = users.findIndex(user => user.id === id);
   users.splice(userIndex,1)
   return res.json({ status:"succesfully deleted" });
      
   });


app.listen(port,  () => {
   console.log(`server stated at port no : ${port}`);
})