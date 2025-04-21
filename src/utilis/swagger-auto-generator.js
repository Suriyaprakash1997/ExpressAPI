const swaggerAutogen = require("swagger-autogen")();
const dotenv = require("dotenv");
dotenv.config();

const doc = {
  info: {
    title: `${process.env.API_NAME || "My API"}`,
    description: `${process.env.API_DESC || "Auto-generated docs"}`,
    version: `${process.env.API_VERSION || "1.0.0"}`,
  },
  host: `localhost:${process.env.API_PORT || "8082"}`,
  schemes: ["http"],
  
};

const outputFile = "../docs/swagger-output.json";
const endpointsFiles = ["../app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);