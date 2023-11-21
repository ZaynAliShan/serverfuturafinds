const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      maxlenth: 4,
      required: [true, "Please provide product SKU"],
    },
    name: {
      type: String,
      minlength: 3,
      required: [true, "Please provide product name"],
    },

    onHold: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    toCome: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
