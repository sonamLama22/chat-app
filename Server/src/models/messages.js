const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
  },
  { collection: "messages" }
);

module.exports = mongoose.model("Messages", messagesSchema);
