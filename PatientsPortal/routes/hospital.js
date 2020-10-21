var express = require("express");
var router = express.Router();
var { hospitalrequireSignIn } = require("../controller/auht");
var {
  doctorsignup,
  getalldoctors,
  deletedoctor,
  patientsignup,
  getallpatients,
  deletepatient,
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
router.get("/getdoctors", hospitalrequireSignIn, getalldoctors);
router.delete("/deletedoctor", hospitalrequireSignIn, deletedoctor);

//Hospital's patient action routes
router.post(
  "/patientsignup",
  hospitalrequireSignIn,
  patientSignUpValidation,
  patientsignup
);
router.get("/getpatients", hospitalrequireSignIn, getallpatients);
router.delete("/deletepatient", hospitalrequireSignIn, deletepatient);

module.exports = router;
