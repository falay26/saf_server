const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const segmentSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    start: {
      type: Number,
      default: null,
    },
    start_date: {
      type: Number,
      default: null,
    },
    end: {
      type: Number,
      default: null,
    },
    end_date: {
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
    stocks: {
      type: Array,
      default: [],
    },
    stock_1_id: {
      type: ObjectId,
      default: null,
    },
    stock_2_id: {
      type: ObjectId,
      default: null,
    },
    stock_3_id: {
      type: ObjectId,
      default: null,
    },
    stock_4_id: {
      type: ObjectId,
      default: null,
    },
    stock_5_id: {
      type: ObjectId,
      default: null,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Segment", segmentSchema);
