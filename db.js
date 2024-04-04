const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017");

const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to dataBase");
});
db.on("disconnected", () => {
  console.log("disconnected from dataBase");
});
exports.module = db;
