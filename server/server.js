const express = require("express");
const dotenv = require("dotenv");
const urlRoute = require("./routes/url");
const { connectDB } = require("./connect");
const URL = require("./models/url");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODBURL = process.env.MONGODBURL;

connectDB(MONGODBURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/url", urlRoute); // Use the url routes for /url endpoint


app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
