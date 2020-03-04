module.exports = systemService => {
  const controller = {
    about: (req, res) => {
      res.json(systemService.about());
    },
    health: (req, res, next) => {
      systemService
        .health()
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          return next(err);
        });
    },
    updateUser: (req, res, next) => {
      req.session.user.ttl = req.body.ttl;
      res.json(req.session.user);
    }
  };
  return controller;
};
