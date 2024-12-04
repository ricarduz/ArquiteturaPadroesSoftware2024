/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Arquivo principal do servidor da API.
 */

require("dotenv").config(); // Carregar variáveis de ambiente do arquivo .env
const express = require("express");
const morgan = require("morgan");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // Porta definida nas variáveis de ambiente ou 3000 como padrão
const BASE_URL = process.env.BASE_URL || "http://localhost:3000"; // URL base definida no .env ou localhost
const VALID_TOKENS = process.env.VALID_TOKENS ? process.env.VALID_TOKENS.split(",") : ["SEU_TOKEN_SEGURO"]; // Lista de tokens válidos

// Middleware para Logs e CORS
app.use(morgan("combined")); // Logs detalhados no terminal para monitorar requisições
app.use(cors({ origin: "*" })); // Permitir todos os domínios (para produção, ajuste para restringir)

// Middleware para Log de Requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware para Processamento de Requisições
app.use(express.json()); // Processar JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Processar dados enviados via formulário

// Middleware de Autenticação
/**
 * Middleware de autenticação que verifica se o token de autorização é válido.
 * Para rotas protegidas, é necessário enviar um cabeçalho "Authorization" com um token válido.
 */
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
    console.error(`[${new Date().toISOString()}] Erro de autenticação: Token inválido para ${req.method} ${req.url}`);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// Rotas
const configRoutes = require("./routes/config");
const deployRoutes = require("./routes/deploy");
const analyticsRoutes = require("./routes/analytics");

// Rotas para Criadores de Atividades
const { router: gestaoDeStockRouter } = require("./models/GestaoDeStockFactory");
const { router: organizacaoDePrateleirasRouter } = require("./models/OrganizacaoDePrateleirasFactory");

// Rotas para Testes
const testRouter = require("./test");

// Aplicar autenticação apenas em rotas sensíveis
app.use("/deploy", authenticate); // Protege apenas as rotas de deploy
app.use("/config", configRoutes); // Rotas de configuração
app.use("/analytics", analyticsRoutes); // Rotas de analytics

// Adicionar rotas para criadores
app.use("/gestaodestock", gestaoDeStockRouter); // Rota para Gestão de Stock
app.use("/organizacaoprateleiras", organizacaoDePrateleirasRouter); // Rota para Organização de Prateleiras

// Adicionar rotas de testes
app.use("/test", testRouter); // Rotas para testes

// Iniciar o Servidor
app.listen(PORT, () => {
  console.log(`============================================`);
  console.log(`🚀 Activity Provider is running on ${BASE_URL}`);
  console.log(`📋 Swagger docs available at ${BASE_URL}/api-docs`);
  console.log(`🌐 Endpoints disponíveis:`);
  console.log(listEndpoints(app));
  console.log(`============================================`);
});

// Importa o Swagger após o restante das configurações
require("./swagger")(app); // Configura a documentação Swagger
