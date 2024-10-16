const express = require('express');
const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const router = express.Router();

router.post('/create-student', createStudent);
router.get('/get-students', getStudents);
router.get('/student/:id', getStudentById);
router.put('/student-update/:id', updateStudent);
router.delete('/student-delete/:id', deleteStudent);

module.exports = router;
