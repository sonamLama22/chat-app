const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema(
  {
<<<<<<< HEAD
    sender: { type: String },
    message: { type: String },
    members: Array,
  },
  { timestamps: true },
=======
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
>>>>>>> dfe384377f91554e705a0af4fdedf37c219628e4
  { collection: "messages" }
);

module.exports = mongoose.model("Messages", messagesSchema);
