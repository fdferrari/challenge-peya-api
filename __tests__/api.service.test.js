describe("auth.service", () => {
  const userToken = "498-050115-7705e52b-696d-4731-42a1-7ce8a4029333";
  const data = {
    total: 10,
    max: 2,
    sort: "",
    count: 2,
    data: [
      {
        logo: "johnny-days.jpg",
        ratingScore: "4.44",
        deliveryTimeMaxMinutes: "30",
        link: "johnny-days",
        name: "Johnny Day's",
        coordinates: "-34.903,-56.1517",
        opened: 1,
        topCategories: ""
      },
      {
        logo: "chiviteria-marcos-centro.jpg",
        ratingScore: "4.53",
        deliveryTimeMaxMinutes: "180",
        link: "chiviteria-marcos---centro",
        name: "Chivitería Marcos - Centro",
        coordinates: "-34.9013,-56.1825",
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
  };

  const country = 1;
  const point = '-34.50,-56.35';
  const fields = 'name,topCategories,ratingScore,logo,deliveryTimeMaxMinutes,opened,link,coordinates';
  const offset = 0;
  
  test("test getRestaurant", async () => {
    const get = (url, params, headers) => {
      expect(url).toBe("search/restaurants");
      expect(params).toStrictEqual({country, point, fields, offset});
      expect(headers).toStrictEqual({ Authorization: userToken });
      return Promise.resolve({data:data});
    };
    const apiService = require("../services/api.service")(get);
    const result = await apiService.getRestaurant(
      userToken,
      country,
      point,
      fields,
      offset
    );
    expect(result.data).toStrictEqual(data);
  });

  test("test getAllRestaurants", async () => {
    const apiService = require("../services/api.service")(null);
    apiService.getRestaurant = (userToken, country, point, fields, offset) => {
      return Promise.resolve({data:data});
    };

    const result = await apiService.getAllRestaurants(userToken, country, point, ['ratingScore'], ['desc'], { opened:1 });
    expect(result.data.length).toBe(
      data.total
    );
    expect(result.data[0].ratingScore).toBe(
      "4.53"
    );
  });
});
