const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const country = 1;
const lat = -34;
const lng = -56;

const result = { total: 0, data: [] };

const apiService = {
  getAllRestaurants: (
    userToken,
    country,
    point,
    iteratees,
    orders,
    predicateFilter,
    fields
  ) => {
    expect(iteratees[0]).toBe('ratingScore');
    expect(orders[0]).toBe('desc');
    expect(predicateFilter).toStrictEqual({opened : 1});
    expect(point).toBe(lat + "," + lng);
    return Promise.resolve(result);
  }
};

const cacheService = {
  find: keyCache => {
    expect(keyCache).toBe("KEY_" + country + "_" + lat + "_" + lng);
    return null;
  },
  save: (key, value, ttl) => {}
};

const ApiController = require("../controller/api.controller")(
  apiService,
  cacheService
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get(
  "/api/search",
  function(req, res, next) {
    req.session = { user: { ttl: 20 } };
    next();
  },
  ApiController.search
);

test("search endpoint", done => {
  request(app)
    .get("/api/search")
    .query({ country, lat, lng })
    .set({ "x-access-token": 123 })
    .expect(200, function(err, res) {
      expect(res.text).toStrictEqual(JSON.stringify(result));
      done();
    });
});
