const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const port = 3000;
const fs = require('fs');

//middileware - plugin
app.use(express.urlencoded({ extended: false }));

//my middleware

app.use((req,res, next) => {
   fs.appendFile("log.txt",`\n${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`, (err,data) => {
      next()
   });
});

//routs
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