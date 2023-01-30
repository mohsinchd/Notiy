const app = require("./app");
require("dotenv").config({ path: "backend/config/config.env" });
const connectDB = require("./config/db");

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is Running on the PORT: ${PORT}`));
