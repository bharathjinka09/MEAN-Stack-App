const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

mongoose.connect(
  // "mongodb://localhost:27017/meanauth",
  "mongodb+srv://bharath:bharath@cluster0.sw6ju.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("MongoDB connection succeeded.");
    else
      console.log(
        "Error in DB connection : " + JSON.stringify(err, undefined, 2)
      );
  }
);

mongoose.connection.on("connected", () => {
  console.log("connected to db" + config.database);
});

const app = express();

const users = require("./routes/users");

const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

app.get("/", (req, res) => {
  res.send("invalid");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
