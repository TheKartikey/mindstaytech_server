// controllers/studyMaterialController.js
const path = require('path');
const fs = require("fs");
const batchModel = require('../models/batch.model');
const videoModel = require('../models/video.model');

// Controller for uploading study material
const uploadVideoMaterial = async (req, res) => {
    try {
      const { title, description, batch_no } = req.body;
  
      // Check if the video file is uploaded
      if (!req.files || !req.files.videoURL) {
        return res.status(400).json({ error: 'No video file uploaded' });
      }
  
      const videoFile = req.files.videoURL;
  
      // Define the new folder for video uploads
      const videoUploadDir = path.join(__dirname, '..', 'video_materials');
      const videoUploadPath = path.join(videoUploadDir, videoFile.name);
  
      // Create the folder if it doesn't exist
      if (!fs.existsSync(videoUploadDir)) {
        fs.mkdirSync(videoUploadDir, { recursive: true });
      }
  
      // Move the uploaded video file to the specified folder
      videoFile.mv(videoUploadPath, async (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
  
        // Save the video details to the database
        const relativeVideoPath = `${videoFile.name}`;
        const studyMaterial = new videoModel({
          title,
          description,
          videoURL: relativeVideoPath, 
          batch_no
        });
  
        await studyMaterial.save();
        res.status(200).json({
          message: 'Video material uploaded successfully',
          studyMaterial,
        });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const getAllVideoMaterials = async (req, res) => {
    try {
      
      const materials = await videoModel.find();
  
      const results = await Promise.all(
        materials.map(async (material) => {

          const batch = await batchModel.findOne({ batch_no: material.batch_no });
  
         
          return {
            ...material._doc, 
            batchTitle: batch ? batch.title : null, 
          };
        })
      );
  
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  const getVideoMaterialsByBatch = async (req, res) => {
    try {
      const { batch_no } = req.params;
  
      // Find video materials for the given batch number
      const materials = await videoModel.find({ batch_no });
  
      // Attach batch details to each video material
      const results = await Promise.all(
        materials.map(async (material) => {
          const batch = await batchModel.findOne({ batch_no: material.batch_no });
          return {
            ...material._doc,
            batchTitle: batch ? batch.title : null,
          };
        })
      );
  
      // Send the response
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  const deleteVideoMaterial = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the video material by ID
      const material = await videoModel.findById(id);
      if (!material) {
        return res.status(404).json({ error: 'Video material not found' });
      }
  
      // Define the file path
      const videoFilePath = path.join(__dirname, '..', 'video_materials', material.videoURL);
  
      // Delete the video file from the filesystem
      if (fs.existsSync(videoFilePath)) {
        fs.unlinkSync(videoFilePath);
      }
  
      // Delete the video material from the database
      await videoModel.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Video material deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  

module.exports = {
    uploadVideoMaterial,
    getAllVideoMaterials,
    getVideoMaterialsByBatch,
    deleteVideoMaterial
}