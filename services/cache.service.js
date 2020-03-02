var winston = require("../config/winston");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

let service = {};

service.save = (key, value, ttl) => {
  winston.debug(`save result in cache by key=${key} | ttl=${ttl} sec`);
  return myCache.set(key, value, ttl);
};

service.find = key => {
  return myCache.get(key);
};

module.exports = service;
