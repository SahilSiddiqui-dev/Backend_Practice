const asyncHandler = require('../utils/asyncHandler');
const instructorServices = require('../services/instructorServices');

//@desc Create Instructor
//@route Post /api/instructor

exports.createInstructor = asyncHandler(async (req, res) => {
    const {fullName, email, designation, department} = req.body;

    const instructor = await instructorServices.createInstructorService({fullName, email, designation, department});

    res.status(201).json({
        success : true,
        data : instructor
    })
})

// @desc   Get all instructors
// @route  Get /api/instructor
exports.getAllInstructors = asyncHandler(async (req, res) => {
    const instructor = await instructorServices.getAllInstructorService();

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

    const instructor = await instructorServices.deactivateInstructorById(id); 
    
    res.status(200).json({
        success : true,
        message : "Instructor is deactivated Successfully",
        data : instructor
    })
})


