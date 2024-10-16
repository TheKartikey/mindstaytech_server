// controllers/studyMaterialController.js
const path = require('path');
const StudyMaterial = require('../models/studyMaterial.model');
const fs = require("fs");
const batchModel = require('../models/batch.model');
// Controller for uploading study material
const uploadStudyMaterial = async (req, res) => {
  try {
    const { title, description, batch_no } = req.body;

    // Check if the file is uploaded
    if (!req.files || !req.files.pdfFile) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const pdfFile = req.files.pdfFile;

    // Define the upload path
    const uploadDir = path.join(__dirname, '..', 'pdf_material');
    const uploadPath = path.join(uploadDir, pdfFile.name);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    
    pdfFile.mv(uploadPath, async (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const relativePdfPath = `${pdfFile.name}`;

      const studyMaterial = new StudyMaterial({
        title,
        description,
        pdfPath: relativePdfPath, 
        batch_no
      });

      await studyMaterial.save();
      res.status(200).json({
        message: 'Study material uploaded successfully',
        studyMaterial,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllStudyMaterials = async (req, res) => {
  try {
    // Fetch all study materials
    const materials = await StudyMaterial.find();

    // Create an array to hold the results
    const results = await Promise.all(
      materials.map(async (material) => {
        // Fetch the batch title using the batch_no from the material
        const batch = await batchModel.findOne({ batch_no: material.batch_no });

        // Return the material along with the batch title
        return {
          ...material._doc, // Spread the material properties
          batchTitle: batch ? batch.title : null, // Add the batch title or null if not found
        };
      })
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



const getStudyMaterialByBatchNo = async (req, res) => {
  try {
    const { batch_no } = req.params;

    
    const studyMaterials = await StudyMaterial.find({ batch_no }).lean();

    if (!studyMaterials.length) {
      return res.status(404).json({ error: 'No study materials found for the given batch number' });
    }

    res.status(200).json(studyMaterials);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};






const deleteStudyMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the study material by ID
    const material = await StudyMaterial.findById(id);
    if (!material) {
      return res.status(404).json({ error: 'Study material not found' });
    }

    // Get the full path to the PDF file
    const pdfFilePath = path.join(__dirname, '..', 'pdf_materials', material.pdfPath);

    // Check if the file exists before trying to delete it
    if (fs.existsSync(pdfFilePath)) {
      fs.unlink(pdfFilePath, async (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to delete file' });
        }

        // Once the file is deleted, remove the entry from the database
        await StudyMaterial.findByIdAndDelete(id);
        res.status(200).json({ message: 'Study material deleted successfully' });
      });
    } else {
      // If the file does not exist, still delete the record from the database
      await StudyMaterial.findByIdAndDelete(id);
      res.status(200).json({ message: 'Study material deleted successfully, but file was not found' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
    uploadStudyMaterial,
    getAllStudyMaterials,
    getStudyMaterialByBatchNo,
    deleteStudyMaterial
}