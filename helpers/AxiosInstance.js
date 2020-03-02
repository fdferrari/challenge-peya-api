const axiosFactory = require('./AxiosFactory');
const axios = axiosFactory.createAxios();

axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  //console.error('interceptors error wrapper');

  let message = error.message;
  
  if (error.response && error.response.data) {
    message = error.response.data.message;
  }

  const status = error.response ? error.response.status : 500;

  let errorWrapper = new Error(message);
  errorWrapper.status = status;

  return Promise.reject(errorWrapper);
});

executeRequest = (method, baseURL, uri, data, headers) => {
  let cancel = null;

  let request = axios({
    baseURL: baseURL,
    method: method,
    url: uri,
    data: data,
    headers: headers,
    cancelToken: axiosFactory.createCancelToken((c) => {
      cancel = c;
    })
  });

  request.abort = (msg) => {
    msg ? cancel(msg) : cancel('Operation canceled by the user.')
  };
  return request;
};

module.exports = {
  executeRequest: executeRequest
};