var _ = require("lodash");

let service = {};

service.getAllRestaurants = async (
  country,
  point,
  iteratees,
  orders,
  predicateFilter,
  fields = "name,topCategories,ratingScore,logo,deliveryTimeMaxMinutes,opened,link"
) => {
  let offset = 0;
  let res = await service.getRestaurant(country, point, fields, offset);
  offset += res.count;
  const all = [...res.data];
  while (offset < res.total) {
    res = await service.getRestaurant(country, point, fields, offset);
    offset += res.count;
    all.push(...res.data);
  }
  const data = _.orderBy(_.filter(all, predicateFilter), iteratees, orders);
  return { total: data.length, data: data };
};
service.getRestaurant = (country, point, fields, offset) => {
  return Promise.resolve({
    total: 9,
    max: 3,
    sort: "",
    count: 3,
    data: [
      {
        logo: "chiviteria-marcos-centro.jpg",
        ratingScore: "4.53",
        deliveryTimeMaxMinutes: "180",
        link: "chiviteria-marcos---centro",
        name: "Chivitería Marcos - Centro",
        opened: 1,
        topCategories: ""
      },
      {
        logo: "disco-centro.jpg",
        ratingScore: "0",
        deliveryTimeMaxMinutes: "30",
        link: "disco-centro",
        name: "Disco Centro",
        opened: 0,
        topCategories: ""
      },
      {
        logo: "johnny-days.jpg",
        ratingScore: "4.44",
        deliveryTimeMaxMinutes: "30",
        link: "johnny-days",
        name: "Johnny Day's",
        opened: 1,
        topCategories: ""
      }
    ],
    offset: 0,
    info: {
      flags: [
        {
          name: "search-filter-prices",
          value: "Variation1"
        },
        {
          name: "affordable-products",
          value: "Variation1"
        }
      ],
      advertisingAreaId: "5cd0572658c229161acc82f3",
      advertisingAreaType: 1,
      areaId: 19066
    }
  });
};

module.exports = service;
