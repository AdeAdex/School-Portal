const express = require("express");
const router = express.Router();
const { getStudentAccountSignUp, getStudentAccountSignIn, postStudentAccountSignUp, postStudentAccountSignIn, getStudentAccountDashboard } = require("../controllers/studentaccount.controller");

router.get("/studentsignup", getStudentAccountSignUp);

router.get("/studentsignin", getStudentAccountSignIn);


router.get("/studentdashboard", getStudentAccountDashboard)

router.post("/studentsignup", postStudentAccountSignUp)

router.post("/studentsignin", postStudentAccountSignIn)

module.exports = router;
