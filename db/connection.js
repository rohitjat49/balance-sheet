const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(
      "mongodb+srv://balance:kgCQ9c4kay6QEwj3@cluster0.xghpelg.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connect to database");
  } catch (err) {
    console.log("could not connect");
  }
};

module.exports = connectToDb;
