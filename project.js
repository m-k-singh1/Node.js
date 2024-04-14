const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express()
const port = 3000;
//middileware - plugin
app.use(express.urlencoded({ extended: false }));

//routs
app.get("/users",  (req,res) => {
   return res.json(users);
});
app.post("/users",  (req,res) => {
   const body = req.body;
   console.log("body", body);
   return res.json({ status: " it's panding"});
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
   return res.json( { status : "panding"});
});


app.listen(port,  () => {
   console.log(`server stated at port no : ${port}`);
})