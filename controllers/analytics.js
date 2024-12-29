/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Rotas relacionadas à coleta e exibição de dados analíticos.
 */

const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AnalyticsRequest:
 *       type: object
 *       required:
 *         - activityID
 *       properties:
 *         activityID:
 *           type: string
 *           description: "ID da atividade para a qual os dados analíticos são requisitados"
 *       example:
 *         activityID: "123"
 *     AnalyticsResponse:
 *       type: object
 *       properties:
 *         activityID:
 *           type: string
 *           description: "ID da atividade"
 *         inveniraStdID:
 *           type: string
 *           description: "ID padrão da Inven!RA"
 *         quantAnalytics:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Nome da métrica quantitativa"
 *               value:
 *                 type: number
 *                 description: "Valor da métrica quantitativa"
 *         qualAnalytics:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Nome da métrica qualitativa"
 *               value:
 *                 type: string
 *                 description: "Valor da métrica qualitativa"
 *       example:
 *         activityID: "123"
 *         inveniraStdID: "gestor001"
 *         quantAnalytics:
 *           - name: "Tempo_decisão"
 *             value: 120
 *           - name: "Precisao_encomendas"
 *             value: 95
 *         qualAnalytics:
 *           - name: "Feedback_formador"
 *             value: "Excelente gestão de stocks!"
 */

/**
 * @swagger
 * /analytics/list:
 *   get:
 *     summary: Lista os tipos de métricas disponíveis
 *     responses:
 *       200:
 *         description: "Retorna uma lista das métricas qualitativas e quantitativas disponíveis"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 qualAnalytics:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: "Nome da métrica qualitativa"
 *                       type:
 *                         type: string
 *                         description: "Tipo de dado (ex.: text/plain)"
 *                 quantAnalytics:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: "Nome da métrica quantitativa"
 *                       type:
 *                         type: string
 *                         description: "Tipo de dado (ex.: integer)"
 */

/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Verifica o funcionamento do endpoint de Analytics
 *     responses:
 *       200:
 *         description: "Mensagem indicando o funcionamento do endpoint"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /analytics:
 *   post:
 *     summary: Retorna dados analíticos simulados para um activityID específico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnalyticsRequest'
 *     responses:
 *       200:
 *         description: "Dados analíticos simulados para o activityID fornecido"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AnalyticsResponse'
 *       400:
 *         description: "Erro de validação - activityID ausente"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: "Mensagem de erro"
 */

// Dados Mock para Analytics
const analyticsMock = [
  {
    inveniraStdID: "gestor001",
    quantAnalytics: [
      { name: "Tempo_decisão", value: 120 },
      { name: "Precisao_encomendas", value: 95 },
      { name: "Taxa_cumprimento_vendas", value: 90 },
    ],
    qualAnalytics: [
      { name: "Feedback_formador", value: "Excelente gestão de stocks!" },
    ],
  },
  {
    inveniraStdID: "gestor002",
    quantAnalytics: [
      { name: "Tempo_decisão", value: 150 },
      { name: "Precisao_encomendas", value: 80 },
      { name: "Taxa_cumprimento_vendas", value: 85 },
    ],
    qualAnalytics: [
      { name: "Feedback_formador", value: "Boas decisões, mas atenção ao tempo!" },
    ],
  },
];

// GET /analytics/list - Lista os Tipos de Métricas Disponíveis
router.get("/list", (req, res) => {
  res.json({
    qualAnalytics: [
      { name: "Feedback_formador", type: "text/plain" },
    ],
    quantAnalytics: [
      { name: "Tempo_decisão", type: "integer" },
      { name: "Precisao_encomendas", type: "percentage" },
      { name: "Taxa_cumprimento_vendas", type: "percentage" },
      { name: "Volume_final_stock", type: "integer" },
    ],
  });
});

// GET /analytics - Endpoint Geral de Informação
router.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>O Ricardo indica que o endpoint de Analytics está a funcionar!</h2>
        <p>Use /analytics/list ou POST para /analytics para pedidos específicos. 
        </p>
      </body>
    </html>
  `);
});

// POST /analytics - Retorna Dados Simulados Baseados no activityID
router.post("/", (req, res) => {
  const { activityID } = req.body;

  if (!activityID) {
    return res.status(400).json({ error: "Missing activityID" });
  }

  // Simula os dados para o activityID fornecido
  const analyticsData = analyticsMock.map((entry) => ({
    activityID,
    inveniraStdID: entry.inveniraStdID,
    quantAnalytics: entry.quantAnalytics,
    qualAnalytics: entry.qualAnalytics,
  }));

  res.json(analyticsData);
});

module.exports = router;
