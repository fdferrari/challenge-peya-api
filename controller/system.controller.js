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
    }
  };
  return controller;
};
