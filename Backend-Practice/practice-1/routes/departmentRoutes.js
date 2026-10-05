const express = require('express');
const router = express.Router();
const {createDepartment, getAllDepartments, getDepartmentById, updateDepartmentById} = require('../controllers/departmentControllers');

router.post('/', createDepartment);
router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);
router.patch('/:id', updateDepartmentById);

module.exports = router;
