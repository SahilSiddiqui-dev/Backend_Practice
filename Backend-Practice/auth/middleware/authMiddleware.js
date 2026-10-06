const express = require('express');
const  authMiddleware = (req, res, next) => {
try {
    const token = req.cokkies;
    if(!token) {
        return res.status(401).json({
            success : false,
            message : "Not authorized to access this route"
        })
    }
    const decoded = jwt.verify(token, Process.env.SECRET_KEY);

    
        req.user = decoded;
        next();
    }
catch (error) {
    return res.status(500).json({
        success : false,
        message : "Server Error"
        })
    }
}
module.exports = authMiddleware;