const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Activity Provider API",
      version: "1.0.0",
      description: "API para Inven!RA",
    },
  },
  apis: ["./routes/*.js"], // Localização das definições de rotas com documentação
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
