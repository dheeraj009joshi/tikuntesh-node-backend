const mongoose = require("mongoose");

const Project = new mongoose.Schema(
  {
    title: { type: String, required: true ,unique: true,trim: true },
    description: { type: String, required: true, trim: true, lowercase: true },
    thumbnail: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      enum: [
        "Website",
        "Application",
        "Digital Marketing",
        "SEO",
        "Automation",
        "Web-Scraping",
      ],
    },
    yearOfProject: { type: String, required: true },
    Link: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", Project);
