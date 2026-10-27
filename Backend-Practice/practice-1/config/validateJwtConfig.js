const validateJwtConfig = () => {
    if(!process.env.JWT_SECRET) {
        console.error('Secret key is not given, please provide JWT Secret code');
        process.exit(1);
    }
}

module.exports = validateJwtConfig;