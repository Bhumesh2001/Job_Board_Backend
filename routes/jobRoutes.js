const express = require("express");
const {
    createJob,
    getJobs,
    updateJob,
    deleteJob,
    getJobsByRecruiter
} = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateJob } = require("../middlewares/validationMiddleware");
const router = express.Router();

router.post("/", authMiddleware, validateJob, createJob);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);
router.get("/", getJobs);
router.get("/my-jobs", authMiddleware, getJobsByRecruiter);

module.exports = router;