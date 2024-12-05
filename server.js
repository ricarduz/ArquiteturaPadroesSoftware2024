/**
 * server.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Arquivo principal do servidor da API.
 */

require("dotenv").config(); // Carregar variáveis de ambiente do arquivo .env
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const path = require("path");
const app = require("./app"); // Importa a configuração do `app.js`

// Variáveis de ambiente
const PORT = process.env.PORT || 3000; // Porta definida no .env ou 3000 como padrão
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`; // URL base

// Middleware global
app.use(morgan("combined")); // Logs detalhados
app.use(cors({ origin: "*" })); // Permitir todos os domínios (ajuste em produção)

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

// Inclusão condicional das rotas para evitar erros
if (GestaoDeStockRouter) {
  app.use("/gestaodestock", GestaoDeStockRouter);
  console.log("🔗 Rota /gestaodestock registrada.");
} else {
  console.log("⚠️ Rota /gestaodestock não foi registrada (router não encontrado).");
}

if (OrganizacaoDePrateleirasRouter) {
  app.use("/organizacaoprateleiras", OrganizacaoDePrateleirasRouter);
  console.log("🔗 Rota /organizacaoprateleiras registrada.");
} else {
  console.log("⚠️ Rota /organizacaoprateleiras não foi registrada (router não encontrado).");
}

// Configuração Swagger
require("./swagger")(app); // Configura a documentação Swagger
console.log(`📋 Swagger docs disponível em: ${BASE_URL}/api-docs`);

// Servir arquivos estáticos para o relatório de testes
app.use("/tests", express.static(path.join(__dirname, "mochawesome-report")));
console.log(`🧪 Relatório de testes disponível em: ${BASE_URL}/tests/mochawesome.html`);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log("============================================");
  console.log(`🚀 Servidor iniciado em: ${BASE_URL}`);
  console.log(`📋 Swagger API Docs: ${BASE_URL}/api-docs`);
  console.log("🌟 Endpoints disponíveis:");
  console.log(listEndpoints(app)); // Lista todas as rotas registradas
  console.log("============================================");
});
