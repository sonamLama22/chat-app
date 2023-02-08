const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema(
  {
    sender: { type: String },
    message: { type: String },
    members: Array,
  },
  { timestamps: true },
  { collection: "messages" }
);

module.exports = mongoose.model("Messages", messagesSchema);
