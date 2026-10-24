const {z} = require("zod");

const createInstructorSchema = z.object({
    fullName : z.string().trim().min(2, "Name should of min 2 characters").max(50, 'Write the full name'),
    email : z.string().trim().toLowerCase().pipe(z.email('Invalid email address')),
    designation : z.enum(['Professor', 'Assistant Professor', 'HOD',  'Associate Professor'], 'Invalid designation'),
    department : z.string().regex(/^[abcdef0123456789]{24}$/, 'invalid department id')
})

module.exports = createInstructorSchema;