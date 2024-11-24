/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Rotas relacionadas à criação de deploys para simulações.
 */

const express = require("express");
const router = express.Router();
const Joi = require("joi");

// Esquema de validação com Joi
const deploySchema = Joi.object({
  activityID: Joi.string().required(),
  InvenRAstdID: Joi.string().required(),
  json_params: Joi.object({
    nivel_stock_inicial: Joi.number().required(),
    objetivo_vendas: Joi.number().required(),
    duracao_campanha: Joi.number().required(),
    descricao_cenario: Joi.string().required(),
  }).required(),
});

// Middleware para validação de dados
const validateDeployData = (req, res, next) => {
  const { error } = deploySchema.validate(req.body);
  if (error) {
    console.error("Erro de Validação:", error.details[0].message);
    return res.status(400).json({ error: `Validation Error: ${error.details[0].message}` });
  }
  next(); // Continua para o próximo middleware ou controlador
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Deployment:
 *       type: object
 *       required:
 *         - activityID
 *         - InvenRAstdID
 *         - json_params
 *       properties:
 *         activityID:
 *           type: string
 *           description: ID único da atividade
 *         InvenRAstdID:
 *           type: string
 *           description: ID do padrão InvenRA
 *         json_params:
 *           type: object
 *           description: Parâmetros da configuração
 *           properties:
 *             nivel_stock_inicial:
 *               type: number
 *               description: Nível inicial de estoque
 *             objetivo_vendas:
 *               type: number
 *               description: Meta de vendas
 *             duracao_campanha:
 *               type: number
 *               description: Duração da campanha em dias
 *             descricao_cenario:
 *               type: string
 *               description: Descrição do cenário
 *       example:
 *         activityID: "123"
 *         InvenRAstdID: "gestor001"
 *         json_params:
 *           nivel_stock_inicial: 100
 *           objetivo_vendas: 200
 *           duracao_campanha: 7
 *           descricao_cenario: "Campanha de exemplo"
 */

/**
 * @swagger
 * /deploy:
 *   get:
 *     summary: Verifica se o endpoint de deploy está funcionando
 *     responses:
 *       200:
 *         description: Confirmação de funcionamento
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /deploy:
 *   post:
 *     summary: Cria uma nova instância de simulação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Deployment'
 *     responses:
 *       200:
 *         description: URL da instância criada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activity_url:
 *                   type: string
 *                   description: URL da simulação criada
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 */

// GET /deploy
router.get("/", (req, res) => {
  res.send(
    "O Ricardo indica que o endpoint está a funcionar! Use POST para /deploy para criar uma nova instância."
  );
});

// POST /deploy com validação
router.post("/", validateDeployData, (req, res) => {
  console.log("Request Body Recebido:", req.body);

  // Dados validados
  const { activityID } = req.body;

  // Resposta com o URL de instância
  const instanceURL = `http://localhost:3000/simulation/${activityID}`;
  res.json({ activity_url: instanceURL });
});

module.exports = router;
