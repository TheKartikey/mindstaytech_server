const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    required: true, 
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  descriptionImageUrl: {
    type: String, 
  },
  mode: {
    type: String,
    default: "Offline",
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      username: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
