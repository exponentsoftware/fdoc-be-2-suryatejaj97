const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const todoRoute = require("./router/Todo");

const app = express();

app.use(express.json());


app.use("/todo", todoRoute);

mongoose.connect("mongodb://localhost:27017/todoapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", function () {
    console.log("Connected to Mongo");
  })
  .on("error", function (err) {
    console.log("Mongo Error", err);
  });

app.listen(8000, () => {
  console.log("Server is up and running at the port 3000");
});
