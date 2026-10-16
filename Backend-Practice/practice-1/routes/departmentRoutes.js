const express = require('express');
const router = express.Router();
const {createDepartment, getAllDepartment, getDepartmentById, updateDepartmentById} = require('../controllers/departmentControllers');

router.post('/', createDepartment);
router.get('/', getAllDepartment);
router.get('/:id', getDepartmentById);
router.patch('/:id', updateDepartmentById);

module.exports = router;
