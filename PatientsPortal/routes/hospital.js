var express = require("express");
var router = express.Router();
var { hospitalrequireSignIn } = require("../controller/auht");
var {
  doctorsignup,
  getalldoctors,
  deletedoctor,
  getpatients,
  patientsignup,
  getallpatients,
  getalldoctors,
  deletepatient,
  EditHospital,
} = require("../controller/hospital");
var {
  doctorSignUpValidation,
  patientSignUpValidation,
} = require("../validator/index");
var { superAdmminrequireSignIn } = require("../controller/auht");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//Hospital's doctor action routes
router.post(
  "/doctorsignup",
  hospitalrequireSignIn,
  doctorSignUpValidation,
  doctorsignup
);
router.delete("/deletedoctor", hospitalrequireSignIn, deletedoctor);
router.get("/getalldoctors", getalldoctors);
//Hospital's patient action routes
router.post(
  "/patientsignup",
  hospitalrequireSignIn,
  patientSignUpValidation,
  patientsignup
);
router.get("/getpatients", hospitalrequireSignIn, getpatients);
router.get("/getallpatients", getallpatients);
router.delete("/deletepatient", hospitalrequireSignIn, deletepatient);

module.exports = router;
