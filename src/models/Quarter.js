const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quarterSchema = new Schema(
  {
    date: {
      type: String,
    },
    stocks: {
      type: Object,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Quarter", quarterSchema);
