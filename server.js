require("dotenv").config(); // Carregar variáveis de ambiente do arquivo .env
const express = require("express");
const morgan = require("morgan");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// Middleware para Logs e CORS
app.use(morgan("combined")); // Logs detalhados
app.use(cors({ origin: "*" })); // Permitir todos os domínios (ajuste conforme necessário)

// Middleware para Log de Requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware para Processamento de Requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Processar dados enviados via formulário

// Middleware de Autenticação
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  const validTokens = ["SEU_TOKEN_SEGURO"]; // Lista de tokens válidos

  if (!token) {
    console.warn(`[${new Date().toISOString()}] Tentativa de acesso sem token.`);
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  if (validTokens.includes(token)) {
    console.log(`[${new Date().toISOString()}] Autenticação bem-sucedida para ${req.method} ${req.url}`);
    next();
  } else {
    console.error(`[${new Date().toISOString()}] Erro de autenticação: Token inválido para ${req.method} ${req.url}`);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// Rotas
const configRoutes = require("./routes/config");
const deployRoutes = require("./routes/deploy");
const analyticsRoutes = require("./routes/analytics");

// Aplicar autenticação apenas em rotas sensíveis
app.use("/deploy", authenticate);
app.use("/config", configRoutes);
app.use("/analytics", analyticsRoutes);

// Iniciar o Servidor
app.listen(PORT, () => {
  console.log(`Activity Provider is running on ${BASE_URL}`);
  console.log("Rotas Registradas:");
  console.log(listEndpoints(app));
});

// Importa o Swagger após o restante das configurações
require("./swagger")(app);
console.log(`Swagger docs available at ${BASE_URL}/api-docs`);
