var express = require("express");
var router = express.Router();
var { superAdminrequireSignIn } = require("../controller/auht");
var {
  getallhospitals,
  hospitalsignup,
  deleteHospital,
  updateHospital,
} = require("../controller/superAdmin");
var { hospitalSignUpValidation } = require("../validator/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//SuperAdmin's hospital action routes
router.post("/hospitalsignup", hospitalSignUpValidation, hospitalsignup);
router.get("/getallhospitals", superAdminrequireSignIn, getallhospitals);
router.delete("/deletehospitals", superAdminrequireSignIn, deleteHospital);
router.put("/edithospitals", superAdminrequireSignIn, updateHospital);

module.exports = router;
