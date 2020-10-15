const mongoose = require("mongoose");
const express = require("express");

const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const backendRoutes = require("./route/backend/router");
const frontendRoutes = require("./route/frontend/router");

mongoose
  .connect(
    "mongodb+srv://admin:123Banane!@clustertest.fgsnt.mongodb.net/npProject?retryWrites=true&w=majority",
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Fail to connect to database"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.urlencoded({ extended: false }));

app.use(express.static("./public"));

app.use(cookieParser());

app.use(methodOverride("_method"));


app.use("/api/", backendRoutes);

app.use("/", frontendRoutes);


module.exports = app;
