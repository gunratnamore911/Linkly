require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const connectDb = require("./config/db");
const app = express();

const User = require("./models/User");

const Links = require("./models/Links");
app.use(express.json({ extended: false, useNewUrlParser: true }));
app.use(cors());

//connect database

connectDb();

app.use("/api/users", require("./routes/api/users"));

app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/link", require("./routes/api/link"));
app.get("/get/links/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    const links = await Links.find();
    const result = links.filter(function (e) {
      return e.user == user.id;
    });

    res.json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON THE ${PORT}`.cyan.bold);
});
