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
    bloodpressure: {
        type: Number,
        trim: true,
        required: false,
    },
    glucose: {
        type: String,
        trim: true,
        required: false,
    },
    hmg: {
        type: String,
        trim: true,
        required: false,
    },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
