var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const indexRouter = require("./routes");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const postRouter = require("./routes/post");
const toolsRouter = require("./routes/tools");
const chatRouter = require("./routes/chattings");
var cors = require("cors");
var app = express();

const corsOptions = {
  origin: true, //["https://localhost:3000/"],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
};
app.use(cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

{
  /* <img src={`http://localhost:3000/postimage/aa98ac176ce646a9df7bbd99ebd638e9`}/> */
}
app.use("/userimage", express.static("./userimg"));
app.use("/postimage", express.static("./postimg"));
app.use("/", indexRouter); // mainpage
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/tools", toolsRouter);
app.use("/chat", chatRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
