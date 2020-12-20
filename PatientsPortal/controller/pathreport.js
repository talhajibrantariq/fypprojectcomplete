var pathReport = require("../model/pathreport");
var Doctor = require("../model/doctor");
const { extend } = require("lodash");
var mongoose = require("mongoose");

exports.createpathReport = async (req, res, next) => {
    console.log("exports.createpathReport -> req.body", req.body);
    const pathreport = await new pathReport(req.body);
    const doctor = await new Doctor(req.body);
    console.log(
        "exports.createpathReport -> await pathreport.save()",
        await pathreport.save()
    );

    res.status(200).json({
        message: "Report saved succesfully",
        message: req.body,
    });
};

exports.getpathReportById = async (req, res) => {
    const report = await pathReport.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.pathreportData._id),
            },
        },
        {
            $lookup: {
                from: "patients",
                localField: "patient",
                foreignField: "_id",
                as: "patients",
            },
        },
        { $unwind: "$patients" },
    ]);

    return res.json(report);
};

exports.getpathReportsByDoctor = async (req, res) => {
    const results = await pathReport.aggregate([
        {
            $match: {
                doctor: mongoose.Types.ObjectId(req.doctor.id),
            },
        },
        {
            $lookup: {
                from: "patients",
                localField: "patient",
                foreignField: "_id",
                as: "patients",
            },
        },
        { $unwind: "$patients" },
    ]);

    res.status(200).json({
        results,
    });
};

exports.getpathReportsOfPatient = async (req, res) => {
    const results = await pathReport.find({ patient: req.patient.id });
    res.status(200).json({
        results,
    });
};

exports.getAllpathReports = (req, res) => {
    pathReport
        .find()
        .select(
            "doctor patient field1 field2 field3 field4 field5 field6 field7 field8 field9 field10"
        )
        .then((pathreport) => {
            console.log("exports.getAllpathReports -> pathreport", pathreport);
            res.status(200).json(pathreport);
        })
        .catch((err) => console.error(err));
};

exports.editpathReportById = (req, res) => {
    console.log("exports.editpathReportById -> req.body", req.body);
    let pathreport = req.pathreportData;
    pathreport = extend(pathreport, req.body);

    pathreport.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
            console.log("exports.updatepathReport -> err", err);
        }
        res.json(pathreport);
        console.log("exports.updatepathReport -> pathreport", pathreport);
    });
    console.log(pathreport);
};

exports.deletepathReportById = (req, res, next) => {
    let pathreport = req.pathreportData;
    pathreport.remove((err, pathreport) => {
        if (err) {
            console.log("exports.deletepathReportById -> err", err);
            return res.status(400).json({
                error: err,
            });
        }
        res.json({ message: "Report deleted successfully" });
    });
};
