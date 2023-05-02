const express = require("express");
const router = express.Router();
const {getStaffAccountSignUp, getStaffAccountSignIn, postStaffAccountSignUp, postStaffAccountSignIn, getStaffAccountDashboard} = require("../controllers/staffaccount.controller");

router.get("/staffsignup", getStaffAccountSignUp);

router.get("/staffsignin", getStaffAccountSignIn);


router.get("/staffdashboard", getStaffAccountDashboard)

router.post("/staffsignup", postStaffAccountSignUp)

router.post("/staffsignin", postStaffAccountSignIn)

module.exports = router;
