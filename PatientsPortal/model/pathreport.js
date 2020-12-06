var mongoose = require("mongoose");
var { ObjectId } = mongoose.Schema;

var pathreportSchema = new mongoose.Schema({
  type:{
     type:String,
     default:"None"
  },
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
  GrossExamination: {
    type: String,
    trim: true,
    required: false,
  },
  MicroscopicExamination: {
    type: String,
    trim: true,
    required: false,
  },
  Specimen: {
    type: String,
    trim: true,
    required: false,
  },
  PertinentHistory: {
    type: String,
    trim: true,
    required: false,
  },
});

const pathreport = mongoose.model("pathreport", pathreportSchema);
module.exports = pathreport;
