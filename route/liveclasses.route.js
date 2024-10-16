const express = require('express');
const { createLiveClass, getLiveClasses, deleteLiveClass, updateLiveClass, getLiveClassesByBatchNo } = require('../controllers/liveClassesController');
const router = express.Router();

// Route to create a new live class
router.post('/create-liveclass', createLiveClass);

// Route to get all live classes
router.get('/get-liveclasses', getLiveClasses);
router.get('/get-live-classes/:batch_no', getLiveClassesByBatchNo);

// Route to delete a live class by ID
router.delete('/liveclass-delete/:id', deleteLiveClass);


router.put('/update-liveclass/:id', updateLiveClass); 

module.exports = router;
