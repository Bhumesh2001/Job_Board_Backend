const Job = require("../models/Job");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.createJob = async (req, res, next) => {
    try {
        if (req.user.role !== "recruiter") return errorResponse(res, "Forbidden", 403);
        const job = await Job.create({ ...req.body, recruiter: req.user.id });
        successResponse(res, "Job created successfully", job);
    } catch (err) {
        next(err);
    }
};

exports.getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find().populate("recruiter", "name email");
        successResponse(res, "Jobs fetched successfully", jobs);
    } catch (err) {
        next(err);
    }
};

exports.getJobsByRecruiter = async (req, res, next) => {
    try {
        if (req.user.role !== "recruiter") return errorResponse(res, "Forbidden", 403);

        const jobs = await Job.find({ recruiter: req.user.id }).sort({ createdAt: -1 }).lean();

        if (!jobs.length) return errorResponse(res, "No jobs found", 404);
        successResponse(res, "Jobs fetched successfully", jobs);
    } catch (err) {
        next(err);
    }
};

exports.updateJob = async (req, res, next) => {
    try {
        if (req.user.role !== "recruiter") return errorResponse(res, "Forbidden", 403);

        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, recruiter: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!job) return errorResponse(res, "Job not found or unauthorized", 404);
        successResponse(res, "Job updated successfully", job);
    } catch (err) {
        next(err);
    }
};

exports.deleteJob = async (req, res, next) => {
    try {
        if (req.user.role !== "recruiter") return errorResponse(res, "Forbidden", 403);

        const job = await Job.findOneAndDelete({ _id: req.params.id, recruiter: req.user.id });

        if (!job) return errorResponse(res, "Job not found or unauthorized", 404);
        successResponse(res, "Job deleted successfully");
    } catch (err) {
        next(err);
    }
};
