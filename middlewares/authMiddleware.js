const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHandler");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return errorResponse(res, "Unauthorized", 401);
    };

    const token = authHeader.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        next(err);
    }
};
