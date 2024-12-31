const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cluster = require("cluster");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const connectDB = require("./src/config/dbConn");

const Cron = require("./src/cron");

const app = express();
const PORT = 3000;

const startServer = () => {
  connectDB();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "/views"));
  app.use("/", express.static(path.join(__dirname, "/public")));
  app.use("/", require("./routes/root"));
  app.use("/login_web", require("./routes/login_web"));

  app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ error: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  });

  mongoose.connection.once("open", () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });

  const cron = new Cron("* * * * *");
  cron.run();
};

if (cluster.isPrimary) {
  cluster.fork();

  cluster.on("exit", () => {
    cluster.fork();
  });
}

if (cluster.isWorker) {
  startServer();
}
