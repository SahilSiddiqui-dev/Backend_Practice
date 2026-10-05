const Department = require('../models/department');
const AppError = require('./utils/AppError');

// Service functions for department operations
exports.createDepartmentService = async ({name, code, description}) => {
    const departmentExist = await Department.findOne({ 
        $or : [
        {code : code.trim().toUpperCase()},
        {name : name.trim()}
    ]
});
    if(departmentExist) {
        throw new AppError("Department Already Exists", 409);
    }
    return await Department.create({name, code, description});
}

// Service function to get all departments
exports.getAllDepartmentsService = async() => {
    return await Department.find().sort({name : 1});
}

// Service function to get department by Id
exports.getDepartmentById = async(id) => {
    const departmentExist = await Department.findById(id);
    if(!departmentExist) {
        throw new AppError(`Department with this ${id} was not found`, 404)
    }
    return departmentExist;
}

// Service function to update department by Id
exports.updateDepartmentById = async(id, description) => {
    
    if(typeof description !== "string" || description.trim().length <= 0) {
    return res.status(400).json({
        success : false,
        message : "Please provide a valid description"
        })
    }

    const departmentExist = await Department.findById(id);
    if(!departmentExist) {
        throw new AppError(`Department with this ${id} was not found`, 404)
    }
    const department = await Department.updateby
    departmentExist.
}

