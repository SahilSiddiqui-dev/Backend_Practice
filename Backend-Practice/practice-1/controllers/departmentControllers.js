const Department = require('../models/department');
const asyncHandler = require('../utils/asyncHandler');

//@desc: Create a new department
//@route: POST /api/department

exports.createDepartment = asyncHandler(async(req, res) => {
    const { name, code, description } = req.body;

    // checking if department already exists
    const existsDep = await Department.findOne({
        $or : [{code : code.toUpperCase()}, {name}]
    });

    if(existsDep) {
        return res.status(400).json({
            success : false,
            message : "Department with this name or code already exists"
        })
    };

    const department = await Department.create({name, code, description});

    res.status(201).json({
        success : true,
        data : department
    });
})

//@desc Get all departments
//@route GET /api/department

exports.getAllDepartments  = asyncHandler(async(req, res) => {
const departments = await Department.find({name : 1});

res.status(200).json({
    success : true,
    count : departments.length,
    data : departments
    })
})

//@desc GET department by Id
//@route GET /api/department/:Id

exports.getDepartmentById = asyncHandler(async(req, res) => {
    const department = await Department.findById(req.params.id);

    if(!department) {
        return res.status(404).json({
            success : false,
            message : `Department Not Found with this ${req.params.id}`
        })
    }

    res.status(200).json({
        success : true,
        data : department
    })

})

