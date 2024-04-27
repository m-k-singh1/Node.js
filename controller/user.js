const myuser = require("../model/user");

async function hendelGetAllUser (req,res){
   const allusers = await myuser.find({});
   const FirstName = allusers.map(user => user.firstName);
   const id = allusers.map(user => user.id);
   return res.json({FirstName,id});
};
async function hendelPostAllUser (req,res){
   const body = await req.body;
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
      return res.status(201).json({ msg: 'success' });
};
async function hendelGetAllUserById (req,res){
   const userid = await myuser.findById(req.params.id);
      if(! userid)return res.status(404).json({error: "user not found"});
      return res.json(userid)
};
async function hendelPatchAllUserById (req,res){
      await myuser.findByIdAndUpdate( req.params.id, { lastName: "rajput"});
      return  res.json( { status : "successfull"}); 
};
async function hendelDeleteAllUserById (req,res){
   await myuser.findByIdAndDelete(req.params.id);
   return res.status(200).json({ msg: " successfull" })
};

module.exports = {
     hendelGetAllUser, 
     hendelPostAllUser,
     hendelGetAllUserById,
     hendelPatchAllUserById,
     hendelDeleteAllUserById
}