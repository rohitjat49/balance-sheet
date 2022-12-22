const express = require("express");
const app = express();
const PORT = 5000;
const color = require("colors");
const Databse = require("./db/connection");
const txnSchema = require("./models/transcation");
const ragisterSchema = require("./models/ragister");
const bcrypt = require("bcrypt");
const cors = require("cors");

// connection to db
Databse();

// middleware
app.use(express.json());
app.use(cors())

app.get("/users", (req, res) => {
  res.send({
    msg: "ha bai response mil gya",
    data: `https://jsonplaceholder.typicode.com/users`,
  });
});

//  Ragister
app.post("/ragister", async (req, res) => {
  let { name, email, mobile, password } = req.body;

  bcrypt.hash(password, 10, async (err, hashPass) => {
    if (err) {
      res.send({
        status: "Ok",
        msg: "password hash is not genrated",
        data: err,
      });
    } else {
      try {
        let foundedData = await ragisterSchema.find({ email });

        if (foundedData.length > 0) {
          res.send({
            status: "Ok",
            msg: "you have to login...",
            data: foundedData,
          });
        } else {
          try {
            let savedData = await ragisterSchema.create({
              name,
              email,
              mobile,
              password: hashPass,
            });
            res.send({
              status: "Ok",
              msg: "Successfully Ragistered",
              data: savedData,
            });
          } catch (err) {
            res.send({ status: "err", msg: "network problem" });
          }
        }
      } catch (err) {
        res.send({
          status: "err",
          msg: "network problem",
        });
      }
    }
  });
});

// txn save
app.post("/save-txn", async (req, res) => {
  let { amount, type, remark } = req.body;

  try {
    let savedData = await txnSchema.create({ amount, type, remark });
    res.send({ status: "Ok", msg: "data saved successfully", data: savedData });
  } catch (err) {
    res.send({ status: "ERR", msg: "something went wrong" });
  }
});

// all txn data get
app.get("/get-txn", async (req, res) => {
  try {
    let FoundedData = await txnSchema.find({});
    res.send({
      status: "Ok",
      msg: "successgully Founded the txn",
      data: FoundedData,
    });
  } catch (err) {
    res.send({ status: "err", msg: "network problem" });
  }
});

// txn update
app.post("/get-txn-update/:id", async (req, res) => {
  let { id } = req.params;
  let { amount, type, remark } = req.body;
  try {
    let FoundedData = await txnSchema.findByIdAndUpdate(id, {
      amount,
      type,
      remark,
    });
    res.send({
      status: "Ok",
      msg: "successgully Updated txn",
      data: FoundedData,
    });
  } catch (err) {
    res.send({ status: "err", msg: "network problem" });
  }
});

// txn delete
app.post("/get-txn-delete/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let delteData = await txnSchema.findByIdAndDelete(id);
    res.send({
      status: "Ok",
      msg: "successgully Deletd",
      data: delteData,
    });
  } catch (err) {
    res.send({ status: "err", msg: "network problem" });
  }
});

app.listen(PORT, () =>
  console.log(color.rainbow(`server is running on ${PORT}`))
);
