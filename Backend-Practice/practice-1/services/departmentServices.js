const Department = require('../models/department');


// Service functions for department operations
exports.createDepartmentService = async ({name, code, description}) => {
    const departmentExist = await Department.findOne({code : code.toUpperCase()});
    if(!departmentExist) {
        return await Department.create({name, code, description});
    }
    throw new Error('Department with this code already exists');
}

// Service function to get all departments
exports.getAllDepartmentsService = async() => {
    return await Department.find().Sort({name : 1});
    
}

// Service function to get department by Id
exports.getDepartentById = async() => {
    const deparmentExist = await Department.findById(req.params.id);
    if(!deparmentExist) {
        throw new Error(`Department Not Found with this ${req.params.id}`);
    }
    return deparmentExist;
}

