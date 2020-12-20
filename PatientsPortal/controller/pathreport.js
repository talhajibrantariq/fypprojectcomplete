var pathReport = require("../model/pathreport");
var Doctor = require("../model/doctor");
const { extend } = require("lodash");
const formidable = require("formidable");
var _ = require("lodash");
var fs = require("fs");

exports.createpathReport = async (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log("form parsed");
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded",
            });
        }
        let pathreport = req.body;

        pathreport = _.extend(pathreport, fields);

        if (files.image) {
            image = {};
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type;

            Object.assign(pathreport, { image });
        }

        const newpathreport = new pathReport(pathreport);

        newpathreport.save((s) => {
            res.status(200).json({
                message: "Report saved succesfully",
                pathreport: s,
            });
        });
    });
};

exports.getpathReportById = (req, res) => {
    return res.json(req.pathreportData);
};

exports.pathReportImage = (req, res, next) => {
    if (req.pathReport.image.data) {
        res.set(("Content-Type", req.pathReport.image.contentType));
        return res.send(req.pathReport.image.data);
    }
    next();
};

exports.getpathReportsByDoctor = async (req, res) => {
    const resu = await pathReport.find({ doctor: req.doctor.id });

    const tmp = resu.values;
    // console.log("exports.getReportsByDoctor -> tmp", tmp);

    let results = Array.from(resu);
    // console.log("exports.getReportsByDoctor -> results", results);

    const x = [];
    resu.map(async (r) => {
        const xx = await Doctor.findOne({ _id: r.doctor });
        r["doctorx"] = xx;
        r["doctory"] = 123;

        x.push(xx);
    });

    res.status(200).json({
        results,
        x,
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
