const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        successResponse(res, "User registered successfully", user);
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return errorResponse(res, "Invalid credentials", 400);
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        successResponse(res, "Login successful", { token, user });
    } catch (err) {
        next(err);
    }
};

exports.recruiterLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return errorResponse(res, "User not found", 404);
        }

        if (user.role !== "recruiter") {
            return errorResponse(res, "Access denied.", 403);
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return errorResponse(res, "Invalid credentials", 400);
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        successResponse(res, "Login successful", { token, user });
    } catch (err) {
        next(err);
    }
};
