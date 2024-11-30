const express = require("express");
const morgan = require("morgan");
const  connectDB  = require("./config/db");
const userRoute = require("./routes/userRoute");

require("dotenv").config();
require("colors");

//db connection
connectDB();

const app = express();
app.use(express.json());
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
