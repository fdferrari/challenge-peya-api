const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const service = {};
service.about = () => {
  return {
    name: "myApp",
    version: "1.0.0",
    apiDoc: "/api-docs"
  };
};

service.health = () => {
  return Promise.resolve({
    healthSummary: {
      dependencies: [],
      result: {
        healthy: true,
        description: "overall health check result"
      }
    }
  });
};

const SystemController = require("../controller/system.controller")(service);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/api/about", SystemController.about);
app.get("/api/health", SystemController.health);

test("about endpoint", done => {
  request(app)
    .get("/api/about")
    .expect("Content-Type", /json/)
    .expect({
      name: "myApp",
      version: "1.0.0",
      apiDoc: "/api-docs"
    })
    .expect(200, done);
});

test("health endpoint", done => {
  request(app)
    .get("/api/health")
    .expect("Content-Type", /json/)
    .expect({
      healthSummary: {
        dependencies: [],
        result: {
          healthy: true,
          description: "overall health check result"
        }
      }
    })
    .expect(200, done);
});
