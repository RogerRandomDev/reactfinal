<<<<<<< HEAD
const mongoose=require('mongoose');
const connectDB = (uri) => {
  return mongoose
    .connect(uri)
    .then(() => console.log('Database Connection'))
    .catch((err) => console.log(err));
};
module.exports={connectDB,process};
=======
const mongoose = require('mongoose');
const connectDB = (uri) => {
   return mongoose
   .connect(uri)
   .then(() => console.log('Database Connection'))
   .catch((err) => console.log(err));
};
module.exports={connectDB,process};
>>>>>>> 2f316f64d908d8d932d0c4337b1e32c7674ada2e
