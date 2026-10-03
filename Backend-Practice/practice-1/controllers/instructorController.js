const Instructor = require('../models/instructor');
const asyncHandler = require('../utils/asyncHandler');
const Department = require('../models/department');

//@desc Create Instructor
//@route Post /api/instructor

exports.createInstructor = asyncHandler(async (req, res) => {
    const {fullName, email, designation, department} = req.body;

    const departmentExists = await Department.findById(department);
    if(!departmentExists){
        return res.status(400).json({
            success : false,
            message : `Cannot assign instructor: ${department} does not exists`
        })
    }

    const instructor = await Instructor.create({
        fullName,
        email,
        designation,
        department
    });

    res.status(201).json({
        success : true,
        data : instructor
    })
})

// @desc   Get all instructors
// @route  Get /api/instructor
exports.getAllInstructors = asyncHandler(async (req, res) => {
    const instructor = await Instructor.find({isActive : true})
    .populate('department', 'name code')
    .sort({createdAt : -1});

    res.status(200).json({
        success : true,
        message : "All instructors retrieved successfully",
        count  : instructor.length,
        data : instructor
    })

})

//@desc soft delete an instructor
//route delete api/instructor/:id

exports.deactivateInstructor = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const instructor = await Instructor.findByIdAndUpdate(
        id,
        {isActive : false},
        {new : true}
    );

    if(!instructor) {
        return res.status(404).json({
            success : false,
            message :  `Instructor with ${id} is not found`
        })
    };
    res.status(200).json({
        success : true,
        message : "Instructor is deactivated Successfully",
        data : instructor
    })
})


