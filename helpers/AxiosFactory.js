const axios = require('axios');
const CancelToken = axios.CancelToken;

createAxios = (config = {}) => {
  let axiosInstance = axios.create(config);

  //functions to change initial config
  axiosInstance.changeDefault = (key, val) => {
    axiosInstance.defaults[key] = val;
  };
  axiosInstance.changeHeader = (key, val) => {
    axiosInstance.defaults.headers[key] = val;
  };
  return axiosInstance;
};

createCancelToken = (executor) => {
  return new CancelToken(executor);
};

sourceCancel = () => {
  return CancelToken.source();
};

module.exports = {
  createAxios: createAxios,
  createCancelToken: createCancelToken,
  sourceCancel: sourceCancel
};
