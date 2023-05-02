const mongoose = require("mongoose");

let studentSchoolPortalSchema = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  identity: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
};

let studentSchoolPortalModel = mongoose.model("studentPortal_collection", studentSchoolPortalSchema);


module.exports = studentSchoolPortalModel