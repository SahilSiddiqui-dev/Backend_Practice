const setRefreshCookie = (res, token) => {
    return res.cookie('refreshToken', token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'development' ? false : true,
        sameSite : 'strict',
        maxAge : 604800000
    })
}

module.exports = setRefreshCookie;