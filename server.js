const express = require("express");
const morgan = require("morgan");
const  connectDB  = require("./config/db");
const userRoute = require("./routes/userRoute");
const cors = require('cors');

require("dotenv").config();
require("colors");

//db connection
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Lokendra Server running on https://localhost:${PORT}`.bgCyan.white
  );
});

//for routes
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Lokendra Pun Server is connecting...");
});
