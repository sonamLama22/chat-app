const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema(
  {
    sender: { type: String },
    message: { type: String },
    receiver: { type: String },
  },
  { collection: "messages" }
);

module.exports = mongoose.model("Messages", messagesSchema);
