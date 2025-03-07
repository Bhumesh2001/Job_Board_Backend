const express = require("express");
const { register, login, recruiterLogin } = require("../controllers/authController");
const { validateUser } = require("../middlewares/validationMiddleware");
const router = express.Router();

router.post("/register", validateUser, register);
router.post("/login", login);
router.post('/recruiter/login', recruiterLogin);

module.exports = router;