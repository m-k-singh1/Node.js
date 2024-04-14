const express = require("express");
const app = express()
const port = 3000;

app.get("/",(req,res)=> {
   return res.send(`it's a home page of my first project`);
})

app.listen(port,  () => {
   console.log(`server is stated at port no : ${port}`);
})