const checkrole = (...requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming the user's role is stored in req.user.role
        if(requiredRole.includes(userRole)) {
            next();
        }
        else {
            return res.status(403).json({
                success : false,
                message : "You do not have permission to access this route"
            })
        }
    }
}
module.exports = checkrole;
