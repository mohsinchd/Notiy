const { asyncHandler } = require("../middleware/asyncHandler");
const Note = require("../model/noteModel");
const ErrorHandler = require("../utils/errorHandler");

// Create New Note (PRIVATE / VERIFIED)
exports.createNewNote = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;
  const note = await Note.create(req.body);
  res.status(200).json({
    success: true,
    note,
  });
});

// Get All Notes (PRIVATE / VERIFIED)
exports.getAllNotes = asyncHandler(async (req, res, next) => {
  const currentPage = Number(req.query.page) || 1;
  const notesPerPage = 6;
  const skip = notesPerPage * (currentPage - 1);

  const keyword = req.query.keyword
    ? {
        note: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const notes = await Note.find({ user: req.user._id, ...keyword })
    .skip(skip)
    .limit(notesPerPage);

  if (notes.length === 0) {
    return next(new ErrorHandler("Your Notes List is Empty", 404));
  }

  const totalNotes = await Note.find({ user: req.user._id }).countDocuments();

  res.status(200).json({
    success: true,
    notes,
    totalNotes,
  });
});

// Update Notes (PRIVATE / VERIFIED)
exports.updateNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  if (!note)
    return next(
      new ErrorHandler(
        `There is no note available with the given ID: ${req.param.id}`,
        404
      )
    );

  const updateNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    updateNote,
  });
});

// Delete Note (PRIVATE / VERIFIED)

exports.deleteNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  if (!note)
    return next(
      new ErrorHandler(
        `There is no note available with the given ID: ${req.param.id}`,
        404
      )
    );

  await note.remove();

  res.status(200).json({
    success: true,
    message: "Deleted Successfully",
  });
});
