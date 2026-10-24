const {z} = require("zod");

const createDepartmentSchema = z.object({
    name : z.string().trim().min(2, 'Minimum of 2 character').max(50, 'maximum of 50 character'),
    code : z.string().trim().toUpperCase().min(2, 'Minimum of 2 character').max(5, 'Maximum of 5 character'),
    description : z.string().trim().min(10, 'Minimum of 10 character').max(500, 'Maximum of 500 character')
})

module.exports = createDepartmentSchema;