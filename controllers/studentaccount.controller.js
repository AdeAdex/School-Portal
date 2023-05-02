const studentSchoolPortalModel = require("../models/studentaccount.model");

const getStudentAccountSignUp = (req, res) => {
  res.render("studentsignup", { message: "" });
};

const getStudentAccountSignIn = (req, res) => {
  res.render("studentsignin", { message: "" });
};


const getStudentAccountDashboard = (req, res) => {
  studentSchoolPortalModel.find()
  .then((response) => {
    res.render('studentdashboard', {response})
  })
  .catch((err) => {
    res.render('studentdashboard')
  });
}

const postStudentAccountSignUp = (req, res) => {
  let form = studentSchoolPortalModel(req.body);
  form
    .save()
    .then((response) => {
      console.log(response);
      console.log("Information saved to the database");
      res.redirect("studentsignin");
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        console.log("Email already exist");
        res.render("studentsignup", { message: "Email already exist" });
      } else {
        console.log("All field are required");
        res.render("studentsignup", { message: "All field are required" });
      }
    });
};

const postStudentAccountSignIn = (req, res) => {
  studentSchoolPortalModel
    .find({ email: req.body.em, password: req.body.pass })
    .then((response) => {
      if (response.length > 0) {
        console.log(response);
        res.redirect("studentdashboard");
      } else {
        res.render("studentsignin", { message: "Incorrect" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getStudentAccountSignUp,
  getStudentAccountSignIn,
  postStudentAccountSignUp,
  postStudentAccountSignIn,
  getStudentAccountDashboard
};
