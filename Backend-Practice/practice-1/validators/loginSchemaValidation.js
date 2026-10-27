const {z} = require('zod') 

const loginSchemaValidation = z.object({
    email : z.string().trim().toLowerCase().pipe(z.email('Invalid Email')),
    password : z.string().min(1, 'Password is required').max(72)

})

module.exports = loginSchemaValidation