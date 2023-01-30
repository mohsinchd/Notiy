const express = require("express");
const { notFound, errorMiddleware } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const app = express();

// Global Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes Imports
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/notesRoutes");

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/note", noteRoutes);

// ErrorMiddlewares
app.use(notFound);
app.use(errorMiddleware);

module.exports = app;
