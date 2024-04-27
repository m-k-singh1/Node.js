const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');
const mongoose = require("mongoose");



//connecting mongodb 
mongoose
.connect("mongodb://localhost:27017/myone")       // as it return promise so then and catch is used 
.then(()=> console.log(`mongodb connected  sucessfully`))
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
const myuser = mongoose.model("users",userschema)  // it creat a data named user 


//middileware - plugin
app.use(express.urlencoded({ extended: false })); //to connect with postman

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
      // console.log(result);
      return res.status(201).json({ msg: 'success' });
   });
   app
   .route("/users/:id")
   .get( async (req,res) => {
         const userid = await myuser.findById(req.params.id);
         if(! userid)return res.status(404).json({error: "user not found"});
         return res.json(userid)
      })   
  .patch( async (req,res) => {
        await myuser.findByIdAndUpdate( req.params.id, { lastName: "rajput"});
         return  res.json( { status : "successfull"});
   })      
   .delete( async (req,res) => {
        await myuser.findByIdAndDelete(req.params.id);
        return res.json({ status: 200 , msg: " successfull" })
     });
  

app.listen(port,  () => {
   console.log(`server stated at port no : ${port}`);
})


// **************************************************************************************************************************************

