const { errorResponse } = require("../utils/responseHandler");

module.exports = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(", ");
    } else if (err.name === "MongoServerError" && err.code === 11000) {
        statusCode = 400;
        message = "Duplicate key error: " + JSON.stringify(err.keyValue);
    } else if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid Token";
    } else if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token has expired";
    }

    return errorResponse(res, message, statusCode);
};