/* eslint-disable no-undef */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const multer = require("multer");
const { connectDb } = require("./database/mongoConnector");
const { makeJsonResponse } = require("./utils/response");

//routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

connectDb();
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  const httpStatusCode = 403;
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page

  if (err instanceof multer.MulterError) {
    console.log("MULTER ERROR " + JSON.stringify(err));
  }

  // res.status(err.status || 500);
  // res.render('error');
  const response = makeJsonResponse(err?.message, {}, {}, httpStatusCode, false);
  res.status(httpStatusCode).json(response);
});

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
