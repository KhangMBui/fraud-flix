const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Fraudflix backend is here to save the day 🚀!");
});

app.listen(PORT, () => {
  console.log(`Fraudflix server is running on port ${PORT}`);
});
