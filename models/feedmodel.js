const mongoose = require('mongoose');
 
const feedSchema = new mongoose.Schema({
    postTitle: {
      type: String,
      required: true,
    },
    postDescription: {
      type: String,
      required: true,
    },
    postImage: {
      type: Buffer,
      required: true,
    },
  },
  {
    timestamps: true
  });
 
module.exports = mongoose.model("Feed", feedSchema);