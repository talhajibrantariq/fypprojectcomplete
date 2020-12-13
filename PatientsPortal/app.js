var createError = require("http-errors");
var cors = require("cors");

var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressValidator = require("express-validator");
var authRouter = require("./routes/auth");
var dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");
var appointmentRouter = require("./routes/appointment");
var patientRouter = require("./routes/patient");
var hospitalRouter = require("./routes/hospital");
var doctorRouter = require("./routes/doctor");
var superAdminRouter = require("./routes/superAdmin");
var reportRouter = require("./routes/report");
var pathRouter = require("./routes/pathreport");
var radRouter = require("./routes/radreport");
var chatRouter = require("./routes/chat");

var fs = require("fs");

var app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log("DB Connection error :" + err.message);
});

app.get("/", (req, res) => {
  fs.readFile("./docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    var docs = JSON.parse(data);
    res.json(docs);
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressValidator());
app.use("/", appointmentRouter);
app.use("/", authRouter);
app.use("/", patientRouter);
app.use("/hospital", hospitalRouter);
app.use("/doctor", doctorRouter);
app.use("/superAdmin", superAdminRouter);
app.use("/report", reportRouter);
app.use("/pathreport", pathRouter);
app.use("/radreport", radRouter);
app.use("/chat", chatRouter);
app.use(cors());
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      error: "Unauthorized",
    });
  }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
