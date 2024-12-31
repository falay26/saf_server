const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    start_date: {
      type: String,
      required: true,
    },
    start_value: {
      type: Number,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    end_date: {
      type: String,
      default: null,
    },
    end_value: {
      type: Number,
      default: null,
    },
    values: {
      type: Array,
      default: [],
    },
    tiers: {
      type: Array,
      default: [],
    },
    refreshToken: [String],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Stock", stockSchema);
