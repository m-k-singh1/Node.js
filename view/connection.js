const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectMongodb (url){
   return mongoose.connect(url) // as it return promise so then is used 
.then(()=> console.log(`mongodb connected  sucessfully`))
.catch((err)=> console.log("error occur",err))
};

module.exports = { 
   connectMongodb,
}