/**
 * deploy.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Rotas relacionadas à criação de deploys para simulações, utilizando o padrão Factory Method.
 */

const express = require("express");
const router = express.Router();
const Joi = require("joi");
const GestaoDeStockFactory = require("../models/GestaoDeStockFactory");
const OrganizacaoDePrateleirasFactory = require("../models/OrganizacaoDePrateleirasFactory");

// Esquema de validação com Joi
const deploySchema = Joi.object({
  activityType: Joi.string().valid("GestaoDeStock", "OrganizacaoDePrateleiras").required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  params: Joi.object().required(),
});

// Middleware para validação de dados
const validateDeployData = (req, res, next) => {
  const { error } = deploySchema.validate(req.body);
  if (error) {
    console.error("Erro de Validação:", error.details[0].message);
    return res.status(400).json({ error: `Validation Error: ${error.details[0].message}` });
  }
  next();
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Deployment:
 *       type: object
 *       required:
 *         - activityType
 *         - name
 *         - description
 *         - params
 *       properties:
 *         activityType:
 *           type: string
 *           description: Tipo da atividade (GestaoDeStock ou OrganizacaoDePrateleiras)
 *         name:
 *           type: string
 *           description: Nome da atividade
 *         description:
 *           type: string
 *           description: Descrição da atividade
 *         params:
 *           type: object
 *           description: Parâmetros específicos da atividade
 *           properties:
 *             stockLevel:
 *               type: number
 *               description: Nível de stock (para GestaoDeStock)
 *             shelfLayout:
 *               type: string
 *               description: Layout das prateleiras (para OrganizacaoDePrateleiras)
 *       example:
 *         activityType: "GestaoDeStock"
 *         name: "Gestão de Stock"
 *         description: "Atividade para gerenciar níveis de stock"
 *         params:
 *           stockLevel: 100
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
 *     summary: Cria uma nova instância de atividade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Deployment'
 *     responses:
 *       200:
 *         description: Detalhes da atividade criada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activityDetails:
 *                   type: object
 *                   description: Detalhes da atividade criada
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

// GET /deploy - Verificação do funcionamento
router.get("/", (req, res) => {
  res.send(`
    <html>
    <body>
      <h2>O Ricardo indica que Deploy está a funcionar!</h2>
      <p>Use POST para /deploy para criar uma nova instância.</p>
    </body>
    </html>
  `);
});

// POST /deploy com validação
router.post("/", validateDeployData, (req, res) => {
  console.log("Request Body Recebido:", req.body);

  const { activityType, name, description, params } = req.body;

  let activity;
  try {
    // Usar o Factory Method para criar a atividade
    switch (activityType) {
      case "GestaoDeStock":
        const gestaoFactory = new GestaoDeStockFactory();
        activity = gestaoFactory.createActivity({
          name,
          description,
          stockLevel: params.stockLevel,
        });
        break;

      case "OrganizacaoDePrateleiras":
        const organizacaoFactory = new OrganizacaoDePrateleirasFactory();
        activity = organizacaoFactory.createActivity({
          name,
          description,
          shelfLayout: params.shelfLayout,
        });
        break;

      default:
        return res.status(400).json({ error: `Unknown activity type: ${activityType}` });
    }

    // Retornar os detalhes da atividade criada
    res.status(200).json({ activityDetails: activity.getDetails() });
  } catch (error) {
    console.error("Erro ao criar atividade:", error.message);
    res.status(500).json({ error: "Erro interno ao criar atividade. Tente novamente mais tarde." });
  }
});

module.exports = router;
