const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express()
const port = 3000;


app.get("/users",  (req,res) => {
   return res.json(users);
});

app.get("/users/:id",(req,res)=> {
   const id = Number(req.params.id);
   const user = users.find( (user) => user.id === id );
   return res.json(user)
});

app.listen(port,  () => {
   console.log(`server stated at port no : ${port}`);
})