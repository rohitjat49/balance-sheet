const mongoose = require("mongoose");

const txnSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "amount daal de bro :)"],
  },
  type: {
    type: String,
    required: [true, "type na daale ?"],
  },
  remark: {
    type: String,
  },
});

module.exports = mongoose.model("transcations", txnSchema);
