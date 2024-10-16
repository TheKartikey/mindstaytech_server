const express = require('express');
const { createBatch, getBatches } = require('../controllers/batchController');
const router = express.Router();

// Create a batch
router.post('/create-batch', createBatch);

// Get all batches
router.get('/get-batches', getBatches);

// // Get a batch by ID
// router.get('/:id', batchController.getBatchById);

// // Update a batch by ID
// router.put('/:id', batchController.updateBatch);

// // Delete a batch by ID
// router.delete('/:id', batchController.deleteBatch);

module.exports = router;
