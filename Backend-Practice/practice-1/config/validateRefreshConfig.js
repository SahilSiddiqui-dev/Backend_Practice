const validateRefreshConfig = () => {
    if(!process.env.JWT_REFRESH_SECRET) {
        console.error('JWT REFRESH KEY IS NOT GIVEN');
        process.exit(1);
    }
}

module.exports = validateRefreshConfig;