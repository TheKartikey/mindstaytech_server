// routes/studyMaterialRoutes.js
const express = require('express');
const { uploadStudyMaterial, getStudyMaterialById, getAllStudyMaterials, getStudyMaterialByBatchNo, deleteStudyMaterial } = require('../controllers/studyMaterial.controller');

const router = express.Router();

// POST route to upload study material
router.post('/upload', uploadStudyMaterial);
router.get('/get-material/:batch_no', getStudyMaterialByBatchNo);
router.get('/get', getAllStudyMaterials);
router.delete('/delete/:id', deleteStudyMaterial);

module.exports = router;
