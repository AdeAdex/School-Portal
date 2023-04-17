const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const URI = 'mongodb+srv://adeoluamole:Adex_3395@cluster0.m9yadoa.mongodb.net/portal_db?retryWrites=true&w=majority'


mongoose
  .connect(URI)
  .then(() => {
    console.log("Mongoose Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

  let schoolPortalSchema = {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    // id: {type: Number, Math.floor(Math.random() *1000},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: Number, required: true},
    city: {type: String, required: true},
    state: {type: String},
    age: {type: Number, required: true},
    gender: {type: String, required: true},
    password: {type: String, required: true}
  }

  let schoolPortalModel = mongoose.model('portal_collection', schoolPortalSchema)

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/pic', express.static('pic'));

app.get("/", (req, res) => {
        // console.log('Welcome to the Landing Page');
        res.sendFile(__dirname + "/index.html");
})

app.get("/landingPage", (req, res) => {
        res.render('landingPage')
})

app.get("/signup", (req, res) => {
  res.render('signup', {message: ""})
});

app.get("/signin", (req, res) => {
  res.render("signin", {message: ""})
})

app.get("/dashboard", (req, res) => {
  schoolPortalModel.find()
  .then((response) => {
    res.render('dashboard', {response})
  })
  .catch((err) => {
    res.render('dashboard')
  });
})

app.post("/signup", (req, res) => {
  let form = schoolPortalModel(req.body)
  form.save()
  .then(()=> {
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

app.post("/signin", (req, res) => {
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


app.listen("7000", () => {
  console.log("Listening on port 7000");
});