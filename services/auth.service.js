const {get} = require('../helpers/AxiosFactory');

let service = {};

service.getAppToken = (clientId, clientSecret) => {
  return get('tokens', {clientId, clientSecret});
};

service.getUserToken= (appToken, userName, password) => {
  return get('tokens', {userName, password}, {'Authorization':appToken});
};

service.getUser = userToken => {
  return get('myAccount',null, {'Authorization':userToken});
};

module.exports = service;
