// const mongoose = require('mongoose');
// const connectDB = (uri) => {
//   return mongoose
//     .connect(uri)
//     .then(() => console.log('Database Connection'))
//     .catch((err) => console.log(err));
// };
// module.exports={connectDB,process};
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const url =
  "mongodb+srv://admin:Ri69NAV3pOWfI7ZC@epichacing.bncpfvd.mongodb.net/el_negocio?retryWrites=true&w=majority";
// Connect MongoDB at default port 27017.
let mong = mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
