const fs = require('fs');

function logdetail(filename){
   return ( req,res , next) => {
      const logdata = `\n${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`;
   fs.appendFile(filename,logdata, (err,data) => {
      next()
   });
   };
};

module.exports = { 
   logdetail
}