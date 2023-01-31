const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: { type: String },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: Array,
  },
  { collection: "messages" }
);

module.exports = mongoose.model("Messages", messagesSchema);
