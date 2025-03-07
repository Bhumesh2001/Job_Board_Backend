const Application = require("../models/Application");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const axios = require("axios");

exports.applyJob = async (req, res, next) => {
    try {
        if (req.user.role !== "candidate") return errorResponse(res, "Forbidden", 403);
        if (!req.file) return errorResponse(res, "Resume file is required", 400);

        const application = await Application.create({
            job: req.body.jobId,
            candidate: req.user.id,
            resumeUrl: req.file.path,
        });
        successResponse(res, "Application submitted successfully", application);
    } catch (err) {
        next(err);
    }
};

exports.viewApplications = async (req, res, next) => {
    try {
        if (req.user.role !== "recruiter") return errorResponse(res, "Forbidden", 403);

        const applications = await Application.find().populate("job").populate("candidate", "name email");

        const parsedApplications = await Promise.all(applications.map(async (app) => {
            const skills = await parseResumeDetails(app.resumeUrl);
            return {
                id: app._id,
                jobTitle: app.job.title,
                company: app.job.company,
                candidateName: app.candidate.name,
                candidateEmail: app.candidate.email,
                resumeUrl: app.resumeUrl,
                skills,
            };
        }));

        successResponse(res, "Applications retrieved successfully", parsedApplications);
    } catch (err) {
        next(err);
    }
};

const parseResumeDetails = async (resumeUrl) => {
    try {
        const response = await axios.post("https://api.edenai.run/v2/ocr/resume_parser", {
            file_url: resumeUrl
        }, {
            headers: {
                Authorization: `Bearer ${process.env.EDEN_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        return response.data.skills ? response.data.skills.join(", ") : "No skills found";
    } catch (error) {
        console.error("Resume parsing failed:", error.message);
        return "Parsing error";
    }
};
