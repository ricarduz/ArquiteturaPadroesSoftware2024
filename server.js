/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Arquivo principal do servidor da API.
 */

require("dotenv").config(); // Carregar variáveis de ambiente do arquivo .env
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const app = require("./app"); // Importa a configuração do `app.js`

const PORT = process.env.PORT || 3000; // Porta definida nas variáveis de ambiente ou 3000 como padrão
const BASE_URL = process.env.BASE_URL || "http://localhost:3000"; // URL base definida no .env ou localhost

// Middleware para Logs e CORS
app.use(morgan("combined")); // Logs detalhados no terminal para monitorar requisições
app.use(cors({ origin: "*" })); // Permitir todos os domínios (para produção, ajuste para restringir)

// Rotas específicas
const configRoutes = require("./routes/config");
const deployRoutes = require("./routes/deploy");
const analyticsRoutes = require("./routes/analytics");
const { router: GestaoDeStockRouter } = require("./models/GestaoDeStockFactory");
const { router: OrganizacaoDePrateleirasRouter } = require("./models/OrganizacaoDePrateleirasFactory");

// Registrar rotas
app.use("/config", configRoutes);
app.use("/deploy", deployRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/gestaodestock", GestaoDeStockRouter);
app.use("/organizacaoprateleiras", OrganizacaoDePrateleirasRouter);

// Configuração Swagger
require("./swagger")(app); // Configura a documentação Swagger
console.log(`Swagger docs available at ${BASE_URL}/api-docs`);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log("============================================");
  console.log(`🚀 Activity Provider is running on ${BASE_URL}`);
  console.log(`📋 Swagger docs available at ${BASE_URL}/api-docs`);
  console.log("🌐 Endpoints disponíveis:");
  console.log(listEndpoints(app)); // Lista rotas registradas
  console.log("============================================");
});
