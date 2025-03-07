const express = require("express");
const { applyJob, viewApplications } = require("../controllers/applicationController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post("/", authMiddleware, upload.single("resume"), applyJob);
router.get('/view', authMiddleware, viewApplications);

module.exports = router;
