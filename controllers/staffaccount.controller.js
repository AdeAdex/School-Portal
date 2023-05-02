const staffSchoolPortalModel = require("../models/staffaccount.model");

const getStaffAccountSignUp = (req, res) => {
  res.render("staffsignup", { message: "" });
};

const getStaffAccountSignIn = (req, res) => {
  res.render("staffsignin", { message: "" });
};

const getStaffAccountDashboard = (req, res) => {
  staffSchoolPortalModel.find()
  .then((response) => {
    res.render('staffdashboard', {response})
  })
  .catch((err) => {
    res.render('staffdashboard')
  });
}


const postStaffAccountSignUp = (req, res) => {
  let form = staffSchoolPortalModel(req.body);
  form
    .save()
    .then((response) => {
      console.log(response);
      console.log("Information saved to the database");
      res.redirect("staffsignin");
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        console.log("Email already exist");
        res.render("staffsignup", { message: "Email already exist" });
      } else {
        console.log("All field are required");
        res.render("staffsignup", { message: "All field are required" });
      }
    });
};

const postStaffAccountSignIn = (req, res) => {
  staffSchoolPortalModel
    .find({ email: req.body.em, password: req.body.pass })
    .then((response) => {
      if (response.length > 0) {
        console.log(response);
        res.redirect("staffdashboard");
      } else {
        res.render("staffsignin", { message: "Incorrect" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getStaffAccountSignUp,
  getStaffAccountSignIn,
  postStaffAccountSignUp,
  postStaffAccountSignIn,
  getStaffAccountDashboard
};
