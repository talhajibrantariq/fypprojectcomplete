var mongoose = require("mongoose");
var { ObjectId } = mongoose.Schema;

var pathreportSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "None",
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
        required: true,
    },
    Specimen: {
        type: String,
        trim: true,
        required: true,
    },
    PertinentHistory: {
        type: String,
        trim: true,
        required: true,
    },
    Comments: {
        type: String,
        trim: true,
        required: true,
    },
});

const pathreport = mongoose.model("pathreport", pathreportSchema);
module.exports = pathreport;
