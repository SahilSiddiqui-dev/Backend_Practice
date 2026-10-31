const clearCookie = (res) => {
    return res.clearCookie('refreshToken', {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'development'? false : true,
        sameSite : 'strict'
    })
}

module.exports = clearCookie;