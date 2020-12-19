var Report = require("../model/report");
var Doctor = require("../model/doctor");
const { extend } = require("lodash");

exports.createReport = async (req, res, next) => {
    console.log("exports.createReport -> req.body", req.body);
    const report = await new Report(req.body);
    const doctor = await new Doctor(req.body);
    console.log(
        "exports.createReport -> await report.save()",
        await report.save()
    );

    res.status(200).json({
        message: "Report saved succesfully",
        message: req.body,
    });
};

exports.getReportById = (req, res) => {
    let report = req.reportData;

    return res.json(report);
};

exports.getDoctorById = (req, res) => {
    return res.json(req.doctor);
};

exports.getPatientById = (req, res) => {
    return res.json(req.patient);
};
exports.getReportsByDoctor = async (req, res) => {
    const resu = await Report.find({ doctor: req.doctor.id });

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

exports.getReportsOfPatient = async (req, res) => {
    const results = await Report.find({ patient: req.patient.id });
    res.status(200).json({
        results,
    });
};

exports.getAllReports = (req, res) => {
    Report.find()
        .select(
            "doctor patient field1 field2 field3 field4 field5 field6 field7 field8 field9 field10"
        )
        .then((report) => {
            console.log("exports.getAllReports -> report", report);
            res.status(200).json(report);
        })
        .catch((err) => console.error(err));
};

exports.editReportById = (req, res) => {
    console.log("exports.editReportById -> req.body", req.body);
    let report = req.reportData;
    report = extend(report, req.body);

    report.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
            console.log("exports.updateReport -> err", err);
        }
        res.json(report);
        console.log("exports.updateReport -> report", report);
    });
    console.log(report);
};

exports.deleteReportById = (req, res, next) => {
    let report = req.reportData;
    report.remove((err, report) => {
        if (err) {
            console.log("exports.deleteReportById -> err", err);
            return res.status(400).json({
                error: err,
            });
        }
        res.json({ message: "Report deleted successfully" });
    });
};
