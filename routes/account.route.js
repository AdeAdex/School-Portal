const express = require("express");
const router = express.Router();
const schoolPortalModel = require('../models/account.model')

router.get("/signup", (req, res) => {
  res.render("signup", { message: "" });
});

router.get("/signin", (req, res) => {
  res.render("signin", { message: "" });
});


router.get("/dashboard", (req, res) => {
  schoolPortalModel.find()
  .then((response) => {
    res.render('dashboard', {response})
  })
  .catch((err) => {
    res.render('dashboard')
  });
})

router.post("/signup", (req, res) => {
  let form = schoolPortalModel(req.body)
  form.save()
  .then((response)=> {
    console.log(response)
    console.log('Information saved to the database')
    res.redirect('signin')
  })
  .catch((err) => {
    console.log(err)
    if (err.code === 11000) {
      console.log('Email already exist')
      res.render('signup', {message: 'Email already exist'})
    } else {
      console.log ('All field are required')
      res.render('signup', {message: 'All field are required'})
    }
  })
})

router.post("/signin", (req, res) => {
  schoolPortalModel.find({email:req.body.em, password:req.body.pass})
  .then((response) => {
    if (response.length > 0) {
      console.log(response)
      res.redirect("dashboard")
    } else {
      res.render("signin", {message: "Incorrect"})
    }
  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router;
