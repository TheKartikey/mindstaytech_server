const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batch_no: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Batch', batchSchema);
