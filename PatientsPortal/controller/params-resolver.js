var Report = require("../model/report");
var Doctor = require("../model/doctor");
var Patient = require("../model/patient");

/****************************
 *
 *  PARAMS
 *
 ****************************
 */
exports.reportIdParam = (req, res, next, id) => {
  Report.findById(id).exec((err, report) => {
    if (err || !report) {
      return res.status(400).json({
        error: "Report not found",
      });
    }
    req.reportData = report;
    next();
  });
};
exports.pathreportIdParam = (req, res, next, id) => {
  pathReport.findById(id).exec((err, pathreport) => {
    if (err || !report) {
      return res.status(400).json({
        error: "Report not found",
      });
    }
    req.pathreportData = pathreport;
    next();
  });
};

exports.doctorIdParam = (req, res, next, id) => {
  Doctor.findById(id).exec((err, doctor) => {
    if (err || !doctor) {
      return res.status(400).json({
        error: "Doctor not found",
      });
    }
    req.doctor = doctor;
    next();
  });
};

exports.patientIdParam = (req, res, next, id) => {
  Patient.findById(id).exec((err, patient) => {
    if (err || !patient) {
      return res.status(400).json({
        error: "Patient not found",
      });
    }
    req.patient = patient;
    next();
  });
};
