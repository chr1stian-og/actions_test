const mongoose = require("mongoose");

const order = new mongoose.Schema({
  Name: { type: String, required: false },
  Price: { type: String, required: false },
  Mesa: { type: String, required: false },
  Estado: { type: String, required: false },
});

module.exports = mongoose.model("order", order);
