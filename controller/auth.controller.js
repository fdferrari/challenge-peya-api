var createError = require("http-errors");

module.exports = authService => {
  const controller = {
    login: async (req, res, next) => {
      try {
        if (!req.body.username)
          return next(createError(400, "Please, send the username to login."));
        if (!req.body.password)
          return next(createError(400, "Please, send the password to login."));
        const responseAppToken = await authService.getAppToken(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET
        );
        const responseUserToken = await authService.getUserToken(
          responseAppToken.data.access_token,
          req.body.username,
          req.body.password
        );
        const responseUser = await authService.getUser(responseUserToken.data.access_token);
        const user = responseUser.data;
        user.ttl = process.env.DEFAULT_TTL;
        req.session.user = user;
        //res.header("x-access-token",  responseUserToken.data.access_token);
        res.json({
          user: user,
          access_token: responseUserToken.data.access_token
        });
      } catch (err) {
        next(err);
      }
    },
    getUser: (req, res, next) =>{
        res.json(req.session.user);
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
