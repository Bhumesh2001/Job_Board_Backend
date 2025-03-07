exports.successResponse = (res, message, data = {}) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message,
        data,
    });
};

exports.errorResponse = (res, message, statusCode = 400) => {
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
};
