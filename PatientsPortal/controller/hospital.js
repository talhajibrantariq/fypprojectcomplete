var _ = require('lodash');
var formidable = require('formidable');
var fs =require('fs');
var Hospital = require('../model/hospital');
var Doctor = require ('../model/doctor');
var Patient= require('../model/patient');

exports.hospitalById = (req, res, next, id)=>{
    Hospital.findById(id).exec((err, hospital)=>{
        if(err || !hospital){
            return res.status(400).json({
                error: "Hospital not found"
            });
        }
        req.profile = hospital;
        next();
    });
};


exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;

    if(!authorized){
        res.status(403).json({
            error: "You are not authorized to perform this action"
        });
    }
}; 

exports.deleteHospital = (req, res, next)=>{
    let hospital = req.profile;
    hospital.remove((err, hospital)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        hospital.hashed_password = undefined;
        hospital.salt = undefined;
        res.json({
            message: "Hospital deleted successfully"
        });
    });
};


/*Doctor's Authetication */
exports.doctorsignup = async (req,res)=>{
    console.log(req.body)
    console.log(req.auth)
    const doctorExists = await Doctor.findOne({email: req.body.email});
    
    if(doctorExists){
        return res.status(403).json({
            error: 'Doctor is already registered'
        });
    }
    const doctor = await new Doctor(req.body);
    doctor.createdBy = req.auth._id;
    await doctor.save();
    res.status(200).json({
        message: "Doctor Registered succesfully"
    });
}

exports.getalldoctors= async (req,res) => {
    const results = await Doctor.find({createdBy: req.auth._id});
    res.status(200).json({
        results
    });
}

exports.deletedoctor= async (req, res) =>  {
    let id = req.body.id;
    let doc = await Doctor.findOne({_id: id});
    console.log(doc);
    if (doc) {
        if (doc.createdBy == req.auth._id) {
            doc.delete();
            res.status(200).json({
                message: "Deleted successfully."
            });
        } else {
            res.status(401).json({
                message: "You are not authorized to delete this user."
            });
        }
    } else {
        res.status(404).json({
            message: "The doctor with specified ID is not found."
        })
    }
}

/*Patient's Authetication */
exports.patientsignup = async (req,res)=>{
    console.log(req.body)
    console.log(req.auth)
    const patientExists = await Patient.findOne({email: req.body.email});
    
    if(patientExists){
        return res.status(403).json({
            error: 'Patient is already registered'
        });
    }
    const patient = await new Patient(req.body);
    patient.createdBy = req.auth._id;
    await patient.save();
    res.status(200).json({
        message: "Patient Registered succesfully"
    });
}

exports.getallpatients= async (req,res) => {
    const results = await Patient.find({createdBy: req.auth._id});
    res.status(200).json({
        results
    });
}

exports.deletepatient= async (req, res) =>  {
    let id = req.body.id;
    let doc = await Patient.findOne({_id: id});
    if (doc.createdBy == req.auth._id) {
        doc.delete();
        res.status(200).json({
            message: "Deleted successfully."
        });
    } else {
        res.status(401).json({
            message: "You are not authorized to delete this user."
        });
    }
}