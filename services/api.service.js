var _ = require("lodash");
const { get } = require("../helpers/AxiosFactory");

let service = {};

service.getAllRestaurants = async (
  userToken,
  country,
  point,
  iteratees,
  orders,
  predicateFilter,
  fields = "name,topCategories,ratingScore,logo,deliveryTimeMaxMinutes,opened,link,coordinates"
) => {
  let offset = 0;
  let res = await service.getRestaurant(
    userToken,
    country,
    point,
    fields,
    offset
  );
  offset += res.data.count;
  const all = [...res.data.data];
  while (offset < res.data.total) {
    res = await service.getRestaurant(
      userToken,
      country,
      point,
      fields,
      offset
    );
    offset += res.data.count;
    all.push(...res.data.data);
  }
  const data = _.orderBy(_.filter(all, predicateFilter), iteratees, orders);
  return { total: data.length, data: data };
};
service.getRestaurant = (userToken, country, point, fields, offset) => {
  return get(
    "search/restaurants",
    { country, point, fields, offset },
    { Authorization: userToken }
  );
};

module.exports = service;
