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

// Variáveis de configuração
const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const VALID_TOKENS = process.env.VALID_TOKENS ? process.env.VALID_TOKENS.split(",") : ["SEU_TOKEN_SEGURO"];

// Middlewares Globais
app.use(morgan("combined")); // Logs detalhados
app.use(cors({ origin: "*" })); // Permitir todos os domínios (ajustar para produção)
app.use(express.json()); // Processar JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Processar dados enviados via formulário

// Middleware de Autenticação
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    console.warn(`[${new Date().toISOString()}] Tentativa de acesso sem token.`);
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  if (VALID_TOKENS.includes(token)) {
    console.log(`[${new Date().toISOString()}] Autenticação bem-sucedida para ${req.method} ${req.url}`);
    next(); // Permitir o acesso à rota
  } else {
    console.error(`[${new Date().toISOString()}] Erro de autenticação: Token inválido.`);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// Importação de Rotas
const configRoutes = require("./routes/config");
const deployRoutes = require("./routes/deploy");
const analyticsRoutes = require("./routes/analytics");
const { router: GestaoDeStockRouter } = require("./models/GestaoDeStockFactory");
const { router: OrganizacaoDePrateleirasRouter } = require("./models/OrganizacaoDePrateleirasFactory");
const testRouter = require("./test");

// Rotas de Recursos e Endpoints
app.use("/config", configRoutes); // Rotas de configuração
app.use("/deploy", authenticate, deployRoutes); // Rotas protegidas de deploy
app.use("/analytics", analyticsRoutes); // Rotas de analytics
app.use("/gestaodestock", GestaoDeStockRouter); // Gestão de Stocks
app.use("/organizacaoprateleiras", OrganizacaoDePrateleirasRouter); // Organização de Prateleiras
app.use("/test", testRouter); // Rotas de testes

// Endpoint Principal
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Activity Provider</title></head>
      <body>
        <h1>🚀 Bem-vindo à API de Atividades!</h1>
        <p>Explore os endpoints disponíveis para interagir com a API.</p>
      </body>
    </html>
  `);
});

// Middleware para Rotas Não Encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log("============================================");
  console.log(`🚀 Activity Provider is running on ${BASE_URL}`);
  console.log(`📋 Endpoints disponíveis:`);
  console.table(listEndpoints(app));
  console.log("============================================");
});

// Configuração Swagger
require("./swagger")(app); // Configura documentação
