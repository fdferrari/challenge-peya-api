const axios = require('axios');

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.API_PEYA,
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

function addHeader(field, value) {

  axiosInstance.defaults.headers.common[field] = '';
  delete axiosInstance.defaults.headers.common[field];

  if (value) {
    axiosInstance.defaults.headers.common[field] = '';
    axiosInstance.defaults.headers.common[field] = `${value}`;
  }
}

function getHeader(field) {
  return axiosInstance.defaults.headers.common[field];
}

function get(url, params, headers) {
  return axiosInstance.get(url, { params: params || {}, headers: headers || {}, withCredentials: true });
}

function post(url, body) {
  return axiosInstance.post(url, body);
}

function put(url, body) {
  return axiosInstance.put(url, body);
}

function deletex(url, body) {
  return axiosInstance.delete(url, { params: body });
}

function setValidator(validator) {
  axiosInstance.interceptors.response.use(validator);
}

module.exports = {
  addHeader, getHeader, get, post, put, deletex, setValidator
};