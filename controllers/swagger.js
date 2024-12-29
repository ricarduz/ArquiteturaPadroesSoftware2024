/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Configuração do Swagger para geração de documentação da API Retail4Everyone.
 */

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/**
 * Configurações do Swagger
 * 
 * - `definition`: Contém informações sobre a API, como título, versão e descrição.
 * - `servers`: Define os servidores onde a API pode ser acessada, incluindo os URLs
 *   de desenvolvimento e produção.
 * - `apis`: Especifica os arquivos onde os comentários JSDoc estão localizados
 *   (neste caso, arquivos na pasta `routes`).
 */
const options = {
  definition: {
    openapi: "3.0.0", // Define a versão do OpenAPI (Swagger 3.0.0)
    info: {
      title: "Retail4Everyone", //Nome do Projeto
      version: "1.0.0", // Versão da API
      description: "API para Inven!RA - Documentação da plataforma Retail4Everyone.", // Breve descrição
    },
    servers: [
      {
        url: "http://localhost:3000", // URL base para desenvolvimento local
        description: "Servidor de Desenvolvimento", // Descrição do ambiente
      },
      {
        url: "https://retail4everyone.onrender.com", // URL base para produção
        description: "Servidor de Produção", // Descrição do ambiente
      },
    ],
  },
  // Diretório onde os arquivos de rotas documentados com Swagger estão localizados
  apis: ["./routes/*.js", "./models/*.js", "./controllers/*.js"],
};


/**
 * Geração de documentação
 * 
 * Utiliza o `swaggerJsdoc` para gerar a documentação com base nas opções acima.
 * O resultado (specs) é usado pelo Swagger UI para exibir a interface interativa.
 */
const specs = swaggerJsdoc(options);

/**
 * Função para integrar o Swagger no aplicativo Express
 * 
 * @param {Object} app - Instância do aplicativo Express onde o Swagger será configurado.
 * 
 * - Adiciona o endpoint `/api-docs` à aplicação, permitindo acesso à interface interativa.
 * - Exibe um log no console com o link para a documentação.
 */
module.exports = (app) => {
  // Configurar a interface Swagger no endpoint /api-docs
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  console.log(
    `Swagger docs configurados. Acesse a documentação em: http://localhost:${process.env.PORT || 3000}/api-docs`
  );
};
