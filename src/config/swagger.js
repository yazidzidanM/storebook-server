// src/config/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Base config
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "My Modular API",
      version: "1.0.0",
      description: "API documentation for my modular monolith",
    },
    servers: [
      { url: "http://localhost:3999", description: "Local server" },
    ],
  },
  apis: [
    "src/modules/**/*.swagger.js", // load swagger spec per module
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
