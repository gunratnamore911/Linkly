require("dotenv").config();
const mongoose = require("mongoose");

const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(process.env.MONGO_URI);
    console.log("Mongodb Connected".blue);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
