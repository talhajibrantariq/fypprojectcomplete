const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for Users
const MessageSchema = new Schema({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: "conversations",
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
        required: true,
    },
    fileName: { type: String, default: null },
    fileType: { type: String, default: "text" },
    file: {
        data: Buffer,
        contentType: String,
    },
});

module.exports = Message = mongoose.model("messages", MessageSchema);
