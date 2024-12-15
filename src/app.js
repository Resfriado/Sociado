const express = require("express");
const xss = require("xss-clean");
const compression = require("compression");/*
const cors = require("cors");*/
const config = require("./config");
const morgan = require("./config/morgan");
// const { authLimiter } = require("./middlewares/rateLimiter");
const routes = require("./routes");
// const { errorConverter, errorHandler } = require("./middlewares/error");
const path = require("path");
const cookieParser = require('cookie-parser');/*
const passport = require("passport");
const session = require("express-session");*/

//const sequelizeService = require("./services/sequelize.service");

const app = express();

// require('./database');

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(express.static(path.join(__dirname, "/public")));
app.use('/uploads', express.static(path.join(__dirname, "..", 'uploads', 'images')));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(cookieParser());

// set security HTTP headers
// app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
/*
app.use(cors());
app.options("*", cors());*/
/*
app.use(
  session({
    secret: config.oauth.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10800000,
    },
  })
);*/

/*
app.use(passport.initialize());
app.use(passport.session());*/

//require("./auth/local.strategy");

// limit repeated failed requests to auth endpoints
/*
if (config.env === "production") {
  app.use("/auth", authLimiter);
}*/

// routes
app.use("/", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  // next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
  res.sendStatus(404)
});

/**
 * // convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

 */
/*
(async () => {
  await sequelizeService.init();
})()*/

module.exports = app;
