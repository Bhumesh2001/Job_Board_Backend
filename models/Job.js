const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
