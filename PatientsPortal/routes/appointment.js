var express = require('express');
var { getAppointment, createAppointment, appointmentByPatient, appointmentById, isPoster, deleteAppointment, updateAppointment}= require('../controller/appointment');
var { patientById } = require('../controller/patient');
const { requireSignIn }= require('../controller/auht');
var {createAppointmentValidator} = require('../validator/index');
var router = express.Router();

/* GET home page. */
router.get('/appointments',getAppointment);

router.post('/appointment/new/:patientId', requireSignIn ,createAppointment ,createAppointmentValidator);

router.delete("/appointment/:appointmentId", requireSignIn, isPoster ,deleteAppointment);

router.put("/appointment/:appointmentId", requireSignIn, isPoster , updateAppointment);


router.get('/appointment/by/:patientId',requireSignIn,appointmentByPatient);
router.param("patientId", patientById);

router.param("appointmentId", appointmentById);

module.exports = router;
