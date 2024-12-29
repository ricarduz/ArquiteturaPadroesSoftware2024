/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Rotas relacionadas à configuração inicial de simulações.
 */

const express = require("express");
const router = express.Router();
const Joi = require("joi");
const cors = require("cors");
const morgan = require("morgan");

// Esquema de validação com Joi
const configSchema = Joi.object({
  nivel_stock_inicial: Joi.number().required(),
  objetivo_vendas: Joi.number().required(),
  duracao_campanha: Joi.number().required(),
  descricao_cenario: Joi.string().required(),
});

// Variável para armazenar os dados recebidos
let submittedData = null;

// Middlewares
router.use(cors({ origin: "https://invenira-platform.com" })); // Restrição de domínio
router.use(morgan("combined")); // Logs detalhados

// GET /config - Renderiza o formulário
router.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>Preencha a seguinte informação:</h2>
        <form action="/config" method="POST">
          <label for="nivel_stock_inicial">Nível de Stock Inicial:</label>
          <input type="number" id="nivel_stock_inicial" name="nivel_stock_inicial" /><br/>

          <label for="objetivo_vendas">Objetivo de Vendas:</label>
          <input type="number" id="objetivo_vendas" name="objetivo_vendas" /><br/>

          <label for="duracao_campanha">Duração da Campanha:</label>
          <input type="number" id="duracao_campanha" name="duracao_campanha" /><br/>

          <label for="descricao_cenario">Descrição do Cenário:</label>
          <input type="text" id="descricao_cenario" name="descricao_cenario" /><br/>

          <button type="submit">Enviar</button>
        </form>
        <p>Para abrir o link onde o repositório está guardado, usar: <a href="https://github.com/ricarduz/ArquiteturaPadroesSoftware2024" target="_blank">GitHub</a></p>
        <p>Para abrir o link onde o API está a correr, usar: <a href="/" target="_blank">Render</a></p>  
        <p>Para abrir o link Analytics, usar: <a href="/analytics" target="_blank">Analytics</a></p>
        <p>Para abrir o link Deploy, usar: <a href="/deploy" target="_blank">Deploy</a></p>
        <p>Para abrir o link da lista Analytics: <a href="/analytics/list" target="_blank">Analytics List</a></p>
        <p>Para abrir o link da Documentação: <a href="/api-docs" target="_blank">Documentação</a></p>
        <p>Para abrir o link Gestão de Stock: <a href="/gestaodestock" target="_blank">Gestão de Stock</a></p>
        <p>Para abrir o link Organização de Prateleiras: <a href="/organizacaoprateleiras" target="_blank">Organização de Prateleiras</a></p>
      </body>
    </html>
  `);
});

// POST /config - Processa os dados enviados
router.post("/", (req, res) => {
  const { error } = configSchema.validate(req.body);
  if (error) {
    return res.status(400).send(`<h3 style="color: red;">Erro: ${error.details[0].message}</h3>`);
  }

  const { nivel_stock_inicial, objetivo_vendas, duracao_campanha, descricao_cenario } = req.body;

  submittedData = { nivel_stock_inicial, objetivo_vendas, duracao_campanha, descricao_cenario };

  res.send(`
    <html>
      <body>
        <h2>Dados Recebidos:</h2>
        <form action="/config/edit" method="POST">
          <label for="nivel_stock_inicial">Nível de Stock Inicial:</label>
          <input type="number" id="nivel_stock_inicial" name="nivel_stock_inicial" value="${nivel_stock_inicial}" /><br/>

          <label for="objetivo_vendas">Objetivo de Vendas:</label>
          <input type="number" id="objetivo_vendas" name="objetivo_vendas" value="${objetivo_vendas}" /><br/>

          <label for="duracao_campanha">Duração da Campanha:</label>
          <input type="number" id="duracao_campanha" name="duracao_campanha" value="${duracao_campanha}" /><br/>

          <label for="descricao_cenario">Descrição do Cenário:</label>
          <input type="text" id="descricao_cenario" name="descricao_cenario" value="${descricao_cenario}" /><br/>

          <button type="submit">Corrigir</button>
        </form>
        <form action="/config" method="GET">
          <button type="submit">Reiniciar Formulário</button>
        </form>
      </body>
    </html>
  `);
});

// POST /config/edit - Processa as correções
router.post("/edit", (req, res) => {
  const { error } = configSchema.validate(req.body);
  if (error) {
    return res.status(400).send(`<h3 style="color: red;">Erro: ${error.details[0].message}</h3>`);
  }

  submittedData = req.body;

  res.send(`
    <html>
      <body>
        <h2>Dados Corrigidos:</h2>
        <p>Nível de Stock Inicial: ${submittedData.nivel_stock_inicial}</p>
        <p>Objetivo de Vendas: ${submittedData.objetivo_vendas}</p>
        <p>Duração da Campanha: ${submittedData.duracao_campanha}</p>
        <p>Descrição do Cenário: ${submittedData.descricao_cenario}</p>
        <form action="/config" method="GET">
          <button type="submit">Reiniciar Formulário</button>
        </form>
      </body>
    </html>
  `);
});

// GET /config/json_params_url
router.get("/json_params_url", (req, res) => {
  res.json([
    { name: "nivel_stock_inicial", type: "integer" },
    { name: "objetivo_vendas", type: "integer" },
    { name: "duracao_campanha", type: "integer" },
    { name: "descricao_cenario", type: "text/plain" },
  ]);
});

module.exports = router;
