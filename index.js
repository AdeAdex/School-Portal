const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config()
const PORT = process.env.PORT || 7500
const mongoose_URI = process.env.URI


mongoose
  .connect(mongoose_URI)
  .then(() => {
    console.log("Mongoose Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

  
  app.use(bodyParser.urlencoded({ extended: true }));

  const accountRouter = require('./routes/account.route')
  const dashboardRouter = require('./routes/dashboard.route')
  const schoolPortalModel = require('./models/account.model')
  app.use('/account', accountRouter)
  app.use('/dashboard', dashboardRouter)

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use('/pic', express.static('pic'));

app.get("/", (req, res) => {
        // console.log('Welcome to the Landing Page');
        res.sendFile(__dirname + "/index.html");
})





app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
