const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "build")));
app.get(["/", "/hotels", "/hotels/*"], (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/hotellist", (req, res) => {
  try {
    const hotellist = require("./hotels.json");
    res.json(
      hotellist.map((hotel) => ({
        ...hotel,
        url: `${hotel.url}/hotels/${hotel.hotelid}`,
      }))
    );
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
});
app.use(express.static("build"));

module.exports = app;
