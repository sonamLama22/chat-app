const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    members: Array,
  },
  { collection: "conversations" }
);

module.exports = mongoose.model("Conversation", conversationSchema);
