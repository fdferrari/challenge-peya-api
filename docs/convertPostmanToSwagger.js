"use strict";

const fs = require("fs");
const postmanToSwagger = require("postman-2-swagger");

const PATH = "./docs/";
const NAME_FILE_POSTMAN = "Challenge-PeYa.postman_collection.json";
const NAME_FILE_SWAGGER = "swagger-challenge.json";

const convertAndSave = postmanJson => {
  const swaggerJson = postmanToSwagger.default(postmanJson);
  fs.writeFileSync(
    PATH.concat(NAME_FILE_SWAGGER),
    JSON.stringify(swaggerJson, null, 2),
    "utf8"
  );
  console.log("done!");
  console.log("create file => ", PATH.concat(NAME_FILE_SWAGGER));
};

let rawdata = fs.readFileSync(PATH.concat(NAME_FILE_POSTMAN));
let postmanJson = JSON.parse(rawdata);
convertAndSave(postmanJson);
