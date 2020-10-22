var express = require("express");

var {
  getReportById,
  getAllReports,
  createReport,
  updateReportById,
  deleteReportById,
} = require("../controller/report");

var router = express.Router();

router.post("/report", createReport);
router.get("/reports", getAllReports);
router.get("/report/:reportId", getReportById);
router.put("/report/:reportId", updateReportById);
router.delete("/report/:reportId", deleteReportById);

module.exports = router;
