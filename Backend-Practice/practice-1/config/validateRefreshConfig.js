const validateRefreshConfig = () => {
    if(!process.env.JWT_REFRESH_SECRET) {
        console.error('JWT REFRESH KEY IS NOT GIVEN');
    }
}

module.exports = validateRefreshConfig;