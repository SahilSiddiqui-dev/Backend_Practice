const Department = require('../models/department');
const AppError = require('../utils/AppError');
const isValid = require('../utils/isValidString');
const isValidNumber = require('../utils/isValidNumber');

// Service functions to create a new department
exports.createDepartmentService = async ({name, code, description}) => {

    if(!isValid(name) || !isValid(code) || !isValid(description)) {
        throw new AppError("All fields are required and should be valid strings", 400);
    }
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
exports.getAllDepartmentService = async({page, limit}) => {
    let pageNumber = page === undefined? 1 : Number(page);
    let limitNumber = limit === undefined? 10 : Number(limit); 

    if(!isValidNumber(pageNumber) || !isValidNumber(limitNumber)){
        throw new AppError("Please provide valid page and limit ", 400);
    }

    limitNumber = Math.min(limitNumber, 50); // Limit the maximum number of results to 50
    const skip = (pageNumber - 1) * limitNumber;
    const totalDepartments = await Department.countDocuments();
    const totalPages = Math.ceil(totalDepartments / limitNumber);
    const departments = await Department.find().sort({name : 1}).skip(skip).limit(limitNumber);
    return {
        data: departments,
        total: totalDepartments,
        page: pageNumber,
        limit: limitNumber,
        totalPages: totalPages
    };
}

// Service function to get a department by Id
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
        throw new AppError("Description is required and should be a valid string", 400);

    }

    const departmentExits = await Department.findByIdAndUpdate(id, {description}, {new : true, runValidators : true});
    if(!departmentExits) {
        throw new AppError(`Department with this ${id} was not found`, 404)
    }
    
    return departmentExits;
}

