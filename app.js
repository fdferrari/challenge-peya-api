var express = require("express");
var cors = require("cors");
var result = require("dotenv").config();
var cookieParser = require("cookie-parser");
var session = require("express-session");
var helmet = require("helmet");
var morgan = require("morgan");
var winston = require("./config/winston");

//check if load env file
if (result.error) {
  throw result.error;
}

// se especifica el entorno y recupera la configuración
const env = process.env.NODE_ENV || "development";

var app = express();

//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

app.use(morgan("combined", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    resave: true,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    },
    secret: process.env.SECRET_SESSION
  })
);

//enable CORS
if (env === "development") {
  const corsUrls = (process.env.CORS_URLS || "*").split(",");
  app.use(
    cors({
      origin: (origin, cb) =>
        cb(null, corsUrls.includes("*") || corsUrls.includes(origin)),
      credentials: true,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "x-access-token"]
    })
  );
}

/*
 * services
 */

const authService = require("./services/auth.service");
const apiService = require("./services/api.service");
const cacheService = require("./services/cache.service");
const systemService = require("./services/system.service");
/*
 * controller
 */

const AuthController = require("./controller/auth.controller")(authService);
const SystemController = require("./controller/system.controller")(
  systemService
);
const ApiController = require("./controller/api.controller")(
  apiService,
  cacheService
);

/*
 * routes
 */

//check if cookie is saved in browser and user is not set
app.use(require("./middlewares/cookie.clear.handler"));

app.post("/api/login", AuthController.login);
app.get("/api/logout", AuthController.logout);
app.get("/api/about", SystemController.about);
app.get("/api/health", SystemController.health);

// protected routes api
app.use(require("./middlewares/auth.handler"));

app.get("/api/user", AuthController.getUser);
app.put("/api/user", SystemController.updateUser);
app.get("/api/search", ApiController.validateSearch, ApiController.search);

// error handler
app.use(require("./middlewares/error.handler"));

module.exports = app;
