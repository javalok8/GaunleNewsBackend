const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI_LOCAL, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  });

  //console.log(`Lokendra MongoDB Cloud Connected: ${conn.connection.host}`.cyan.underline.bold);
  console.log(`Lokendra MongoDB local Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports =  connectDB ;
