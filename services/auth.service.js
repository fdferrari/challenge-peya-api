let service = {};

service.getAppToken = (clientId, clientSecret) => {
  return Promise.resolve({
    access_token: "498-010206-7b1b8460-02ad-4414-5f18-eb1d15c3d3b3"
  }); 
  //return Promise.reject('ERROR in method getAppToken');
};

service.getUserToken= (appToken, userName, password) => {
  return Promise.resolve({
    access_token: "498-010210-0eb711b2-486a-48ce-4de1-a703ed234a2c"
  });
};

service.getUser = userToken => {
  return Promise.resolve({
    id: 3797223,
    lastName: "Automation",
    name: "Test",
    country: { id: 1 }
  });
};

module.exports = service;
