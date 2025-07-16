
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const PORT = process.env.PORT || 3000;


const authRouter = require("./controllers/auth");

const usersRouter = require("./controllers/users");
const tasksRouter = require("./controllers/tasks");


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    console.log('MongoDB URI (first 20 chars):', process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) : 'NOT SET');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    console.error('MongoDB URI exists:', !!process.env.MONGODB_URI);
    // Don't exit immediately in Azure, let it retry
    setTimeout(() => process.exit(1), 5000);
  });



app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Health check endpoint for Azure
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running", status: "healthy" });
});

app.use("/auth", authRouter);

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Environment check:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- PORT:', PORT);
  console.log('- MONGODB_URI exists:', !!process.env.MONGODB_URI);
  console.log('- JWT_SECRET exists:', !!process.env.JWT_SECRET);
});
