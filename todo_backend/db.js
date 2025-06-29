const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
  try {
    mongoose.connect(process.env.DB);
    console.log("connected to DB successfully");
  } catch (error) {
    console.error("error connecting the database", error);
  }
};
