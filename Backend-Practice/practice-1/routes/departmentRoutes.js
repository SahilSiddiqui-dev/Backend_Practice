const express = require('express');
const router = express.Router();
const {createDepartment, getAllDepartment, getDepartmentById, updateDepartmentById} = require('../controllers/departmentControllers');
const validate = require('../middleware/validate')
const createDepartmentSchema = require('../validators/departmentValidation');

router.post('/', validate(createDepartmentSchema), createDepartment);
router.get('/', getAllDepartment);
router.get('/:id', getDepartmentById);
router.patch('/:id', updateDepartmentById);

module.exports = router;
