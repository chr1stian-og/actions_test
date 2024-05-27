const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: { type: String, required: false },
  password: { type: String, required: false },
});

module.exports = mongoose.model("user", user);
