/**
 * config.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Rotas relacionadas à configuração inicial de simulações.
 */

const express = require("express");
const router = express.Router();
const Joi = require("joi");
const cors = require("cors");
const morgan = require("morgan");
const ConfigAdapter = require("../adapters/ConfigAdapter");

// Instância do adaptador
const configAdapter = new ConfigAdapter();

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

/**
 * @swagger
 * components:
 *   schemas:
 *     Configuration:
 *       type: object
 *       required:
 *         - nivel_stock_inicial
 *         - objetivo_vendas
 *         - duracao_campanha
 *         - descricao_cenario
 *       properties:
 *         nivel_stock_inicial:
 *           type: integer
 *           description: Nível inicial de stock
 *         objetivo_vendas:
 *           type: integer
 *           description: Meta de vendas
 *         duracao_campanha:
 *           type: integer
 *           description: Duração da campanha em dias
 *         descricao_cenario:
 *           type: string
 *           description: Descrição do cenário
 *       example:
 *         nivel_stock_inicial: 100
 *         objetivo_vendas: 200
 *         duracao_campanha: 7
 *         descricao_cenario: "Campanha de Natal"
 */

/**
 * @swagger
 * /config:
 *   get:
 *     summary: Obtém a página de configuração inicial
 *     responses:
 *       200:
 *         description: Página HTML com formulário de configuração inicial
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */

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
        <p>Para abrir o link da Documentação: <a href="/api-docs" target="_blank">Documentação</a></p>
      </body>
    </html>
  `);
});

/**
 * @swagger
 * /config:
 *   post:
 *     summary: Processa os dados enviados no formulário de configuração
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Configuration'
 *     responses:
 *       200:
 *         description: Exibe os dados recebidos e permite correções
 */

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
      </body>
    </html>
  `);
});

/**
 * @swagger
 * /config/json_params_url:
 *   get:
 *     summary: Obtém parâmetros configuráveis em formato JSON
 *     responses:
 *       200:
 *         description: Parâmetros configuráveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

// GET /config/json_params_url
router.get("/json_params_url", (req, res) => {
  res.json([
    { name: "nivel_stock_inicial", type: "integer" },
    { name: "objetivo_vendas", type: "integer" },
    { name: "duracao_campanha", type: "integer" },
    { name: "descricao_cenario", type: "text/plain" },
  ]);
});

/**
 * @swagger
 * /config/adapted:
 *   get:
 *     summary: Obtém parâmetros adaptados para o formato interno.
 *     description: Retorna parâmetros do formato Inven!RA adaptados para o formato interno utilizado no sistema.
 *     responses:
 *       200:
 *         description: Parâmetros adaptados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stockLevel:
 *                   type: integer
 *                   description: Nível inicial de stock.
 *                   example: 100
 *                 salesGoal:
 *                   type: integer
 *                   description: Objetivo de vendas.
 *                   example: 200
 *                 campaignDuration:
 *                   type: integer
 *                   description: Duração da campanha em dias.
 *                   example: 7
 *                 scenarioDescription:
 *                   type: string
 *                   description: Descrição do cenário.
 *                   example: "Campanha de Natal"
 */

// GET /config/adapted_params
router.get("/adapted", (req, res) => {
  const adaptedParams = configAdapter.adaptInvenraParams({
    nivel_stock_inicial: 100,
    objetivo_vendas: 200,
    duracao_campanha: 7,
    descricao_cenario: "Campanha de Natal",
  });

  res.json(adaptedParams);
});

module.exports = router;
