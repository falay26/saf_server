const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aDay1Schema = new Schema(
  {
    date: {
      type: String,
    },
    stocks: {
      type: Object,
    },
    holiday: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("ADay1", aDay1Schema);
