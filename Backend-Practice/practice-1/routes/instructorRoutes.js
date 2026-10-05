const express = require('express');
const router = express.Router();
const { createInstructor, getAllInstructors, deactivateInstructor } = require('../controllers/instructorController');

router.post('/', createInstructor);
router.get('/', getAllInstructors);
router.delete('/:id', deactivateInstructor);    

module.exports = router;