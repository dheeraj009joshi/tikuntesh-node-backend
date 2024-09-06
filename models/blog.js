const mongoose = require("mongoose");

const Blog = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", Blog);
