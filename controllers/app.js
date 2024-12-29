/**
 * app.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Arquivo principal do servidor da API.
 */

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const path = require("path");

const configRoutes = require("./routes/config");
const deployRoutes = require("./routes/deploy");
const analyticsRoutes = require("./routes/analytics");

const { router: GestaoDeStockRouter } = require("./models/GestaoDeStockFactory");
const { router: OrganizacaoDePrateleirasRouter } = require("./models/OrganizacaoDePrateleirasFactory");

// Inicializar aplicação
const app = express();

// Middleware
app.use(morgan("combined"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração Swagger
require("./swagger")(app); // Adiciona documentação Swagger em /api-docs

// Rotas principais
app.use("/config", configRoutes);
app.use("/deploy", deployRoutes);
app.use("/analytics", analyticsRoutes);

if (GestaoDeStockRouter) {
  app.use("/gestaodestock", GestaoDeStockRouter);
}
if (OrganizacaoDePrateleirasRouter) {
  app.use("/organizacaoprateleiras", OrganizacaoDePrateleirasRouter);
}

// Servir o diretório mochawesome-report
app.use("/tests", express.static(path.join(__dirname, "mochawesome-report")));

// Página inicial
app.get("/", (req, res) => {
    const today = new Date().toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  
    res.send(`
      <html>
        <body>
          <h1>Bem-vindo à API de Atividades / Retail4everyone</h1>
          
          <p>Acesse a documentação em: 
            <a href="/api-docs" target="_blank">Swagger API Docs</a>
          </p>
          
          <h2>Produto Abstrato e Produto Concreto:</h2>
          <ul>
            <li>
              <a href="/gestaodestock" target="_blank">Produto Concreto: Gestão de Stock</a>
            </li>
            <li>
              <a href="/organizacaoprateleiras" target="_blank">Produto Concreto: Organização de Prateleiras</a>
            </li>
          </ul>
          
          <h2>Links úteis:</h2>
          <ul>
            <li>
              <a href="/config" target="_blank">Configuração de Atividades</a>
            </li>
            <li>
              <a href="/deploy" target="_blank">Deploy de Atividades</a>
            </li>
            <li>
              <a href="/analytics" target="_blank">Analytics</a>
            </li>
            <li>
              <a href="/analytics/list" target="_blank">Lista de Analytics</a>
            </li>
            <li>
              <a href="/tests/mochawesome.html" target="_blank">Ver resultados dos testes: Relatório de Testes</a>
            </li>
          </ul>
          
          <h2>Outros recursos:</h2>
          <ul>
            <li>
              <a href="https://github.com/ricarduz/ArquiteturaPadroesSoftware2024" target="_blank">Repositório GitHub</a>
            </li>
            <li>
              <a href="/" target="_blank">Render - Página Inicial</a>
            </li>
          </ul>
          
          <footer style="margin-top: 20px; font-size: 0.9em; color: #555;">
            <p>Autor: Ricardo Isaias Serafim | Email: <a href="mailto:2302605@estudante.uab.pt">2302605@estudante.uab.pt</a></p>
            <p>Data: ${today}</p>
          </footer>
        </body>
      </html>
    `);
  });
  
  
  
// Listar endpoints (útil para depuração)
app.get("/endpoints", (req, res) => {
  res.json(listEndpoints(app));
});

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Exportar app para uso em outros módulos
module.exports = app;
