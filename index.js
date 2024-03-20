// // *********************** to creat server *****************

// const fs = require("fs")
// const http = require("http");
// const myserver = http.createServer( (req , res) => {
//    const login = `${Date.now()} : ${req.url}  new request recive \n`;

//    fs.appendFile("login.txt",login , (error , result) => {
//       if (error) {
//          console.log(error);
//       } else {
//          switch (req.url) {
//             case "/":
//                res.end("Home page")
//                break;
//             case "/contact":
//                res.end("its a contact page")
//                break;
//             case "/about":
//                res.end("its about me that is mayank singh")
//                break;
//             case "/details":
//                res.end("its a detail page of this website")
//                break;
//             default: 
//                res.end("404 page not found")
//                break;
//          }
//          console.log(`data appended to login file sucessfully`);
//       }
//    } )
// });

// myserver.listen(8000, () => {
//    console.log(`server started`); 
// })

const http = require("http")

const myserver = http.createServer( (req , res) => {
   console.log(`suscessfull`);
   res.end(`hay its working`)
})  