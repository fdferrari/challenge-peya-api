var createError = require("http-errors");

module.exports = authService => {
  const controller = {
    login: async (req, res, next) => {
      try {
        if (!req.body.username)
          return next(createError(400, "Please, send the username to login."));
        if (!req.body.password)
          return next(createError(400, "Please, send the password to login."));
        const appToken = await authService.getAppToken(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET
        );
        const userToken = await authService.getUserToken(
          appToken,
          req.body.username,
          req.body.password
        );
        const user = await authService.getUser(userToken.access_token);
        user.ttl = process.env.DEFAULT_TTL;
        req.session.user = user;
        //res.header("x-access-token",  userToken.access_token);
        res.json({
          user: user,
          access_token: userToken.access_token
        });
      } catch (err) {
        next(err);
      }
    },
    logout: (req, res, next) => {
      req.session.destroy();
      res.clearCookie("user_sid");
      res.json({
        message: "logout successfully."
      });
    }
  };
  return controller;
};
