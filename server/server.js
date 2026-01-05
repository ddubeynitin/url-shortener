const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const urlRoute = require("./routes/url");
const { connectDB } = require("./connect");
const URL = require("./models/url");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODBURL = process.env.MONGODBURL;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};  

connectDB(MONGODBURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

app.use(cors(corsOptions)); // Enable CORS for all routes (development)

app.use("/url", cors(corsOptions), urlRoute); // Use the url routes for /url endpoint


app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
