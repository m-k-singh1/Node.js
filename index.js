
// const math = require("./math");  // us ctrl + space to seclect built in function
// console.log(math);

// // *****************************************************************************************

// // to creat file usingh fs 

//  const { error, log } = require("console");
let myfile = require("fs");
// myfile.writeFileSync("./text.txt","mayank singh")


// // its a async way to write file only change is to defile arrow fun for error 
// let myfile2 = require("fs");
// myfile2.writeFile("./text.txt2","mayank singh",(err) => {});


// myfile.writeFile("myjs.js","mayank singh",(err) =>{
//    console.log(err);
// })

// myfile.unlinkSync("myjs.js")

// myfile.unlinkSync("text.txt2")


// myfile.appendFileSync("text.txt",`other name is unknown `)

// const read = myfile.readFileSync("./text.txt","utf-8")
// console.log(read);

myfile.readFile("text.txt","utf-8",(error,result) => {
   if (error) {
      console.log(`error ${error}`);
   } else {
      console.log(result);
   }
});

myfile.statSync("text.txt");

// myfile.mkdirSync("myfile")