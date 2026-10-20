const Instructor = require('../models/instructor');
const Department = require('../models/department');
const isValid = require('../utils/isValidString');
const isValidNumber = require('../utils/isValidNumber');
const AppError = require('../utils/AppError');
const mongoose = require('mongoose');

// service for creating instructor
exports.createInstructorService = async({fullName, email, designation, department}) => {
    if(!isValid(fullName) || !isValid(email) || !isValid(designation) || !isValid(department)){
        throw new AppError("Please Provide Valid Inputs", 400);
    }
    const departmentExists = await Department.findById(department);
    if(!departmentExists){
        throw new AppError("Department does not exists", 404);
    }
    const instructor = await Instructor.create({
        fullName,
        email,
        designation,
        department
    });
    return instructor;
}

// service for getting all instructors
exports.getAllInstructorService = async({page, limit, designation, department, fullName, email}) => {
    let pageNumber = page === undefined ? 1 : Number(page);
    let limitNumber = limit === undefined ? 10 : Number(limit);

    if(!isValidNumber(pageNumber) || !isValidNumber(limitNumber)){
        throw new AppError("Please Provide Valid Page and Limit Number", 400);
    }
    
    limitNumber = limitNumber > 50? 50: limitNumber;
    
    const skip = (pageNumber - 1)*limitNumber;
    
    const filter = {isActive : true};

    const AllowedDesignations = Instructor.schema.path('designation').enumValues;
    
    if(department !== undefined){
        if(mongoose.isValidObjectId(department)) {
            filter.department = department;
        } else {
            throw new AppError("Please Provide Valid Department Id", 400);
        }
    }

    if(designation !== undefined) {
        if(AllowedDesignations.includes(designation)) {
            filter.designation = designation;
        } else {
            throw new AppError("Please Provide Valid Designation", 400);
        }
    }

    const instructors = await Instructor.find(filter).populate('department', 'name code').sort({createdAt : -1, _id: -1}).skip(skip).limit(limitNumber);
    const totalInstructors = await Instructor.countDocuments(filter);
    const totalPages = Math.ceil(totalInstructors/limitNumber);

   return {
    data : instructors,
    total : totalInstructors,
    page : pageNumber,
    limit : limitNumber,
    totalPages : totalPages
   }
}

//service for deactivating an instructor
exports.deactivateInstructorById = async(id) => {
    const instructorExists = await Instructor.findByIdAndUpdate(id, {isActive : false}, {new : true});
    if(!instructorExists) {
        throw new AppError('Instructor does not exists', 404);
    }
    return instructorExists;
    
}
