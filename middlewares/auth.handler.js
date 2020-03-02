var createError = require("http-errors");
module.exports = function(req, res, next) {
  if (!(req.cookies.user_sid && req.session.user))
    return next(createError(400, "Invalid session."));
  // check header for the token
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return next(createError(400, "No token provided."));
  next();
};
