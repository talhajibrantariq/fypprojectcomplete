var express = require("express");

var {
  getReportById,
  getAllReports,
  createReport,
  updateReportById,
  deleteReportById,
} = require("../controller/report");

var router = express.Router();

router.post("/", createReport);
router.get("/all", getAllReports);
router.get("/:reportId", getReportById);
router.put("/:reportId", updateReportById);
router.delete("/:reportId", deleteReportById);

module.exports = router;
