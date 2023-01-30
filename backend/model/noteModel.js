const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    note: {
      type: String,
      required: [true, "Please Add a note first"],
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("note", noteSchema);

module.exports = Note;
