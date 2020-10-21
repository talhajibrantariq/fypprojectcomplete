var _ = require("lodash");
var formidable = require("formidable");
var fs = require("fs");
var superAdmin = require("../model/superAdmin");
var Hospital = require("../model/hospital");

exports.superAdminById = (req, res, next, id) => {
  superAdmin.findById(id).exec((err, superAdmin) => {
    if (err || !superAdmin) {
      return res.status(400).json({
        error: "Admin not found",
      });
    }
    req.profile = superAdmin;
    next();
  });
};

exports.hospitalsignup = async (req, res) => {
  console.log(req.body);
  const hospitalExists = await Hospital.findOne({ email: req.body.email });

  if (hospitalExists) {
    return res.status(403).json({
      error: "Email have already taken",
    });
  }
  const hospital = await new Hospital(req.body);
  await hospital.save();
  res.status(200).json({
    message: "Hospital registered succesfully",
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;

  if (!authorized) {
    res.status(403).json({
      error: "You are not authorized to perform this action",
    });
  }
};

exports.updateHospital = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log("form parsed");
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    console.log("Fids", fields);
    let hospital = req.profile;
    hospital = _.extend(hospital, fields);
    hospital.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      hospital.hashed_password = undefined;
      hospital.salt = undefined;
      res.json(hospital);
    });
  });
};

exports.deleteHospital = (req, res, next) => {
  let superAdmin = req.profile;
  superAdmin.remove((err, hospital) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    hospital.hashed_password = undefined;
    hospital.salt = undefined;
    res.json({
      message: "Hospital deleted successfully",
    });
  });
};

exports.getallhospitals = async (req, res) => {
  const results = await Hospital.find({ createdBy: req.auth._id });
  res.status(200).json({
    results,
  });
};
