const express = require('express');
const router = express.Router();
const { createInstructor, getAllInstructors, deactivateInstructor } = require('../controllers/instructorController');
const validate = require('../middleware/validate');
const createInstructorSchema = require('../validators/instructorsValidation');

router.post('/', validate(createInstructorSchema), createInstructor);
router.get('/', getAllInstructors);
router.delete('/:id', deactivateInstructor); 

module.exports = router;