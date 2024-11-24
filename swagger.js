const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/**
 * Configurações do Swagger
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Retail4Everyone", // Nome da API
      version: "1.0.0", // Versão da API
      description: "API para Inven!RA", // Descrição da API
    },
    servers: [
      {
        url: "http://localhost:3000", // URL base para desenvolvimento
        description: "Servidor de Desenvolvimento",
      },
      {
        url: "https://retail4everyone.onrender.com", // URL base para produção
        description: "Servidor de Produção",
      },
    ],
  },
  apis: ["./routes/*.js"], // Localização das definições de rotas com documentação JSDoc
};

/**
 * Geração de documentação com base nas configurações acima
 */
const specs = swaggerJsdoc(options);

/**
 * Função para integrar o Swagger no aplicativo Express
 * 
 * @param {Object} app - Instância do aplicativo Express
 */
module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  console.log(
    `Swagger docs configurados. Acesse a documentação em: http://localhost:${process.env.PORT || 3000}/api-docs`
  );
};
