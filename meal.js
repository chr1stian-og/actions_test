const mongoose = require("mongoose");

const meal = new mongoose.Schema({
  Name: { type: String, required: false },
  Description: { type: String, required: false },
  Image: { type: String, required: false },
  Price: { type: String, required: false },
  Course: { type: String, required: false },
});

// module.exports = mongoose.model("meal", meal);

module.exports = mongoose.models.Meal || mongoose.model('Meal', meal);