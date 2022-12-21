const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "amount daal de bro :)"],
  },
  password: {
    type: String,
    required: [true, "type na daale ?"],
  },
});

module.exports = mongoose.model("login", loginSchema);
