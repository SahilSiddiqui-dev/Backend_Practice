const asyncHandler = require('../utils/asyncHandler');
const departmentServices = require('../services/departmentServices');

//@desc: Create a new department
//@route: POST /api/department
exports.createDepartment = asyncHandler(async(req, res) => {
    const { name, code, description } = req.body;

    const department = await departmentServices.createDepartmentService({name, code, description});

    res.status(201).json({
        success : true,
        data : department
    });
})

//@desc Get all department
//@route GET /api/department
exports.getAllDepartment = asyncHandler(async(req, res) => {
    const { page, limit } = req.query;

    const result = await departmentServices.getAllDepartmentService({page, limit});

    res.status(200).json({ success : true, ...result })
})

//@desc Get a department by id
//@route GET /api/department/:id
exports.getDepartmentById = asyncHandler(async(req, res) => {
    const department = await departmentServices.getDepartmentById(req.params.id);

    res.status(200).json({
        success : true,
        data : department
    })

})



//@desc Update department by Id
//@route Patch /api/department/:Id
exports.updateDepartmentById = asyncHandler(async(req , res) => {
    const { description } = req.body;
    const id = req.params.id;
    const department = await departmentServices.updateDepartmentById(id, description);
    res.status(200).json({
        success : true,
        data : department
    })
    
})
