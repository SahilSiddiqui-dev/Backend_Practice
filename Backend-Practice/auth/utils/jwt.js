const  jwt = require('jsonwebtoken');
const getToken = (user) => {
    jwt.sign(
        {
            email:user.email,
            id:user._id
        },
        SECRET_KEY,
        {
            expiresIn:"1h"
        }
    )
}
module.exports = getToken;