const LiveClass = require('../models/liveClasses.model');

// Create Live Class
const createLiveClass = async (req, res) => {
  try {
    const liveClass = new LiveClass(req.body);
    await liveClass.save();
    res.status(201).json({ message: 'Live class added successfully', liveClass });
  } catch (error) {
    res.status(400).json({ message:  error});
  }
};

// Get All Live Classes
const getLiveClasses = async (req, res) => {
  try {
    const liveClasses = await LiveClass.find();
    res.status(200).json(liveClasses);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching live classes', error });
  }
};

const getLiveClassesByBatchNo = async (req, res) => {
  try {
    const { batch_no } = req.params;

    const liveClasses = await LiveClass.find({ batch_no });

    if (liveClasses.length === 0) {
      return res.status(404).json({ message: 'No live classes found for the given batch number' });
    }

    res.status(200).json(liveClasses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update Live Class by ID
const updateLiveClass = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedLiveClass = await LiveClass.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!updatedLiveClass) {
        return res.status(404).json({ message: 'Live class not found' });
      }
  
      res.status(200).json({ message: 'Live class updated successfully', updatedLiveClass });
    } catch (error) {
      res.status(400).json({ message: 'Error updating live class', error });
    }
  };

  
// Delete Live Class by ID
const deleteLiveClass = async (req, res) => {
  try {
    const { id } = req.params;
    await LiveClass.findByIdAndDelete(id);
    res.status(200).json({ message: 'Live class deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting live class', error });
  }
};

module.exports = {
  createLiveClass,
  getLiveClasses,
  deleteLiveClass,
  updateLiveClass,
  getLiveClassesByBatchNo
};
