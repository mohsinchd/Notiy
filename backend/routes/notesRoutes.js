const express = require("express");
const {
  createNewNote,
  getAllNotes,
  updateNote,
  deleteNote,
} = require("../controller/notesControllers");
const router = express.Router();

const { isAuthenticated, isVerified } = require("../middleware/auth");

router
  .route("/")
  .post(isAuthenticated, isVerified, createNewNote)
  .get(isAuthenticated, isVerified, getAllNotes);

router
  .route("/:id")
  .put(isAuthenticated, isVerified, updateNote)
  .delete(isAuthenticated, isVerified, deleteNote);

module.exports = router;
