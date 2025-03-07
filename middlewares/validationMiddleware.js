const { body, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/responseHandler");

exports.validateUser = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array().map(err => err.msg).join(", "), 400);
        }
        next();
    }
];

exports.validateJob = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
    body("company").notEmpty().withMessage("Company name is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array().map(err => err.msg).join(", "), 400);
        }
        next();
    }
];
