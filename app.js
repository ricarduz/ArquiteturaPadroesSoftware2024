require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");

const configRoutes = require("./routes/config");
const deployRoutes = require("./routes/deploy");
const analyticsRoutes = require("./routes/analytics");

const { router: GestaoDeStockRouter } = require("./models/GestaoDeStockFactory");
const { router: OrganizacaoDePrateleirasRouter } = require("./models/OrganizacaoDePrateleirasFactory");

const app = express();

// Middleware
app.use(morgan("combined"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/config", configRoutes);
app.use("/deploy", deployRoutes);
app.use("/analytics", analyticsRoutes);

if (GestaoDeStockRouter) {
  app.use("/gestaodestock", GestaoDeStockRouter);
}
if (OrganizacaoDePrateleirasRouter) {
  app.use("/organizacaoprateleiras", OrganizacaoDePrateleirasRouter);
}

// Teste inicial
app.get("/", (req, res) => {
  res.send("<h1>Bem-vindo à API de Atividades</h1>");
});

// Middleware de erro
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Exportar app para uso em outros módulos
module.exports = app;
