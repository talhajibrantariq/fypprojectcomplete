var formidable = require("formidable");
var Report = require("../model/report");
const { extend } = require("lodash");

exports.createReport = async (req, res, next) => {
  console.log("exports.createReport -> req.body", req.body);
  const report = await new Report(req.body);
  console.log(
    "exports.createReport -> await report.save()",
    await report.save()
  );

  res.status(200).json({
    message: "Report saved succesfully",
    message: req.body,
  });
};

exports.reportIdParam = (req, res, next, id) => {
  console.log("exports.reportIdParam -> req", id);
  Report.findById(id).exec((err, report) => {
    if (err || !report) {
      return res.status(400).json({
        error: "Report not found",
      });
    }
    req.reportData = report;
    console.log("exports.reportIdParam -> report", report);
    next();
  });
};

exports.getReportById = (req, res) => {
  return res.json(req.reportData);
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
