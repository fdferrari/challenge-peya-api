const pjson = require("../package.json");
let service = {};

service.about = () => {
  return {
    name: pjson.name,
    version: pjson.version,
    apiDoc: "/api-docs"
  };
};

service.health = () => {
  const dependencies = [];
  let healthy = true;
  return Promise.resolve({
    healthSummary: {
      dependencies: dependencies,
      result: {
        healthy: healthy,
        description: "overall health check result"
      }
    }
  });
};

module.exports = service;
