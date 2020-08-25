var express = require('express');
var { doctorById, getAllDoctors ,getDoctor, updateDoctor, deleteDoctor, doctorPhoto} = require("../controller/doctor");
const { doctorrequireSignIn }= require('../controller/auht');
var router = express.Router();

router.get("/doctors", getAllDoctors);
router.get("/:doctorId", doctorrequireSignIn ,getDoctor);
router.put("/:doctorId",doctorrequireSignIn,updateDoctor);
router.delete("/:doctorId", doctorrequireSignIn, deleteDoctor);
router.get("/photo/:doctorId", doctorPhoto)
router.param("doctorId", doctorById);


module.exports = router;
