require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { connectDB, sequelize } = require("./config/database");

const postRoutes = require("./routes/postRoutes"); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10kb" }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Define routes
app.use("/api/v1/posts", postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server and connect to the database
app.listen(PORT, async () => {
  console.log(`🚀 Server started successfully on port ${PORT}`);
  await connectDB();
  sequelize.sync({ force: true }) // Force sync the database schema
    .then(() => {
      console.log("✅ Synced database successfully...");
    })
    .catch((error) => {
      console.error("❌ Unable to sync database:", error.message);
    });
});
