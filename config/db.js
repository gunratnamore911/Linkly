require("dotenv").config();
const mongoose = require("mongoose");

const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb Connected".blue);
  } catch (err) {
    console.log(err.message);
    console.log("gm error db");

    process.exit(1);
  }
};

module.exports = connectDb;
