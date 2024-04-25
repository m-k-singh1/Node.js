const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');
const mongoose = require("mongoose");



//connecting mongodb 
mongoose
.connect("mongodb://localhost:27017/myone")       // as it return promise so then and catch is used here
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
}, {timestamps: true});
//model of mongo db
const myuser = mongoose.model("users",userschema)


//middileware - plugin
app.use(express.urlencoded({ extended: false }));

//my middleware
app.use((req,res, next) => {
   fs.appendFile("log.txt",`\n${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`, (err,data) => {
      console.log(`its passed trough 2nd middilware`);
      next()   // next allow to pass to the next middlewere or route
   });
});

//routs
app.get("/",(req,res)=> {
   return res.json("its a home page")
})
app.get("/users",  async (req,res) => {
   const allusers = await myuser.find({});
   const allFirstNames = allusers.map(user => user.firstName);
   const allFirstemails = allusers.map(user => user.email);
   return res.json({allFirstNames,allFirstemails});
   });
   
app.post("/users", async (req, res) => {
      const body = req.body;
      if (
         !body || 
         !body.firstName || 
         !body.lastName || 
         !body.email || 
         !body.gender || 
         !body.jobTitle
      ) {
         return res.status(400).json({ msg: 'all the fields are required' });
      }
      const result = await myuser.create({
         firstName: body.firstName,
         lastName: body.lastName,
         email: body.email,
         gender: body.gender,
         jobTitle: body.jobTitle 
      });
      console.log(result);
      return res.status(201).json({ msg: 'success' });
   });

app.listen(port,  () => {
   console.log(`server stated at port no : ${port}`);
})


// **************************************************************************************************************************************
   
   // app
   // .route("/users/:id")
   // .get((req,res)=> {
      //    const id = Number(req.params.id);
      //    const user = users.find( (user) => user.id === id );
      //    return res.json(user)
      // })
      // .patch( (req,res) => {
         //    return  res.json( { status : "panding"});
// })
// .delete( (req,res) => {
   //    const id = parseInt(req.params.id);
   //    const userIndex = users.findIndex(user => user.id === id);
//    users.splice(userIndex,1)
//    return res.json({ status:"succesfully deleted" });

//    });

