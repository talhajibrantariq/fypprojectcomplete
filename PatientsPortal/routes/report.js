var express = require("express");

var {
  reportIdParam,
  getReportById,
  getAllReports,
  createReport,
  editReportById,
  deleteReportById,
} = require("../controller/report");

var router = express.Router();

router.post("/create", createReport);
router.get("/all", getAllReports);
router.get("/:reportId", getReportById);

router.put("/:reportId", editReportById);
router.delete("/:reportId", deleteReportById);
router.param("reportId", reportIdParam);

module.exports = router;
