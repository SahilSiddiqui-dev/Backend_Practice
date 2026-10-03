const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}`;
    } else if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((e) => e.message).join(", ");
    } else if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;
    } else {
        console.error(err);
    }

    res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;