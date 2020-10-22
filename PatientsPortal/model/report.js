var mongoose = require("mongoose");
var { ObjectId } = mongoose.Schema;

var reportSchema = new mongoose.Schema({
  doctor: {
    type: ObjectId,
    ref: "Doctor",
    required: true,
  },
  patient: {
    type: ObjectId,
    ref: "Patient",
    required: true,
  },
  field1: {
    type: String,
    trim: true,
    required: false,
  },
  field2: {
    type: String,
    trim: true,
    required: false,
  },
  field3: {
    type: String,
    trim: true,
    required: false,
  },
  field4: {
    type: String,
    trim: true,
    required: false,
  },
  field5: {
    type: String,
    trim: true,
    required: false,
  },
  field6: {
    type: String,
    trim: true,
    required: false,
  },
  field7: {
    type: String,
    trim: true,
    required: false,
  },
  field8: {
    type: String,
    trim: true,
    required: false,
  },
  field9: {
    type: String,
    trim: true,
    required: false,
  },
  field10: {
    type: String,
    trim: true,
    required: false,
  },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
