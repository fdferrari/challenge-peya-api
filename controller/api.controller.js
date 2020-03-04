var winston = require("../config/winston");
var createError = require("http-errors");

const fields = ['country', 'lat', 'lng'];
module.exports = (apiService, cacheService) => {
  const controller = {
    validateSearch: (req, res, next) => {
      for (const field of fields) {
        if (!req.query[field]) {
          // Field isn't present, end request
          return next(createError(400, `${field} is missing`));
        }
      } 
      next();
    },
    search: async (req, res, next) => {
      try {
        const country = req.query.country;
        const lat = req.query.lat;
        const lng = req.query.lng;
        //find in cache
        const keyCache = generateKeyCache(country, lat, lng);
        const resultCache = cacheService.find(keyCache);
        if (resultCache) {
          winston.debug(`result found in cache by key ${keyCache}`);
          res.json(resultCache);
          return;
        }
        const point = lat.concat(",").concat(lng);
        const sort = "ratingScore:desc"; //TODO: move to query string!
        const predicateSorting = generatePredicateSorting(sort);
        const opened = 1; //TODO: move to query string!
        const predicateFilter = { opened }; //add all fields in this object to filter the result!
        winston.debug(
          `search restaurants with params country=${country} | point=${point}`
        );
        const result = await apiService
          .getAllRestaurants(
            req.headers["x-access-token"],
            country,
            point,
            predicateSorting.iteratees,
            predicateSorting.orders,
            predicateFilter
          )
          .catch(err => next(err));
        //save in cache
        cacheService.save(keyCache, result, req.session.user.ttl);
        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  };

  return controller;
};

generateKeyCache = (country, lat, lng) =>
  "KEY_"
    .concat(country)
    .concat("_")
    .concat(lat)
    .concat("_")
    .concat(lng);

generatePredicateSorting = sort => {
  const predicateSorting = { iteratees: [], orders: [] };
  sort.split(",").forEach(element => {
    const keyDirection = element.split(":");
    predicateSorting.iteratees.push(keyDirection[0]);
    predicateSorting.orders.push(keyDirection[1]);
  });
  return predicateSorting;
};
