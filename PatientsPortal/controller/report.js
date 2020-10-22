var _ = require("lodash");
var formidable = require("formidable");
var Report = require("../model/report");

exports.createReport = async (req, res, next) => {
  const report = await new Report(req.body);
  report.doctor = req.auth._id;
  report.patient = req.auth._id;
  await report.save();

  res.status(200).json({
    message: "Report saved succesfully",
  });
};

exports.getReportById = (req, res, next, id) => {
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
// exports.hasAuthorization = (req, res, next) => {
//   const authorized =
//     req.reportData && req.auth && req.reportData._id === req.auth._id;

//   if (!authorized) {
//     res.status(403).json({
//       error: "Report is not authorized to perform this action",
//     });
//   }
// };

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

exports.updateReportById = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log("exports.updateReportById -> fields", fields);
    if (err) {
      return res.status(400).json({
        error: "Report could not be saved",
      });
    }
    let report = req.reportData;

    report = _.extend(report, fields);

    report.save((err, result) => {
      if (err) {
        console.log("exports.updateReportById -> err", err);
        return res.status(400).json({
          error: err,
        });
      }
      res.json(report);
    });
  });
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
