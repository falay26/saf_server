const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gemSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  values: {
    type: Array,
    default: [],
  },
  tiers: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Gem", gemSchema);
