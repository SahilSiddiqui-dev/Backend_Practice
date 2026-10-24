const {z} = require('zod')

const userSchemaValidate = z.object({
    username : z.string().trim().min(2, 'name should of atleast 2 characters').max(50),
    email : z.string().trim().toLowerCase().pipe(z.email('Provide a valid emial address')),
    password : z.string().min(2, 'password should be atleast of 2 character').max(72, 'password should not be more than 72 characters')
})

module.exports = userSchemaValidate;