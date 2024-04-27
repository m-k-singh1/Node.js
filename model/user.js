const mongoose = require("mongoose");


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
const myuser = mongoose.model("users",userschema) ;

module.exports = {myuser}