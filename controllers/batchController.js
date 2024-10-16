const Batch = require('../models/batch.model');

// Create a new batch
const createBatch = async (req, res) => {
  try {
    const { batch_no, title, description } = req.body;

    // Validate if batch already exists
    const existingBatch = await Batch.findOne({ batch_no });
    if (existingBatch) {
      return res.status(400).json({ message: 'Batch with this number already exists.' });
    }

    const batch = new Batch({ batch_no, title, description });
    await batch.save();

    res.status(201).json({ message: 'Batch created successfully', batch });
  } catch (error) {
    res.status(500).json({ message: 'Error creating batch', error: error.message });
  }
};

// Get all batches
const getBatches = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving batches', error: error.message });
  }
};

// Get a single batch by ID
const getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving batch', error: error.message });
  }
};

// Update a batch by ID
const updateBatch = async (req, res) => {
  try {
    const { batch_no, title, description } = req.body;

    const batch = await Batch.findByIdAndUpdate(
      req.params.id,
      { batch_no, title, description },
      { new: true, runValidators: true }
    );

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    res.status(200).json({ message: 'Batch updated successfully', batch });
  } catch (error) {
    res.status(500).json({ message: 'Error updating batch', error: error.message });
  }
};

// Delete a batch by ID
const deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    res.status(200).json({ message: 'Batch deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting batch', error: error.message });
  }
};

module.exports = {
    createBatch,
    getBatches
}