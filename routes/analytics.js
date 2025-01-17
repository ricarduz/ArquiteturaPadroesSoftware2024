/**
 * analytics.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Rotas relacionadas à coleta e exibição de dados analíticos, com suporte a estratégias de análise.
 */

const express = require("express");
const router = express.Router();
const DataStorage = require("../services/DataStorage");
const PerformanceAverageStrategy = require("../strategies/PerformanceAverageStrategy");
const FrequentStockBreaksStrategy = require("../strategies/FrequentStockBreaksStrategy");
const GeneralPerformanceClassificationStrategy = require("../strategies/GeneralPerformanceClassificationStrategy");

// Instância do Armazenamento de Dados
const dataStorage = new DataStorage();

// Mock de dados analíticos
const analyticsMock = [
  {
    inveniraStdID: "gestor001",
    quantAnalytics: [
      { name: "Tempo_decisão", value: 120 },
      { name: "Precisao_encomendas", value: 95 },
    ],
    qualAnalytics: [
      { name: "Feedback_formador", value: "Excelente gestão de stocks!" },
    ],
  },
];

// Dados analíticos simulados para testes
dataStorage.addData({ performance: 85, stockBreaks: 3 });
dataStorage.addData({ performance: 70, stockBreaks: 8 });
dataStorage.addData({ performance: 95, stockBreaks: 1 });

/**
 * @swagger
 * /analytics/average-performance:
 *   get:
 *     summary: Calcula a média de performance dos dados analíticos.
 *     responses:
 *       200:
 *         description: Retorna a média de performance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averagePerformance:
 *                   type: number
 *                   description: Média de performance.
 */
router.get("/average-performance", (req, res) => {
  try {
    if (dataStorage.isEmpty()) {
      return res.status(404).json({ error: "Nenhum dado disponível para análise." });
    }
    const strategy = new PerformanceAverageStrategy();
    const result = dataStorage.analyzeData(strategy);
    res.json({ averagePerformance: result });
  } catch (error) {
    console.error("Erro em /average-performance:", error.message);
    res.status(500).json({ error: "Erro interno ao calcular média de performance." });
  }
});

/**
 * @swagger
 * /analytics/stock-breaks:
 *   get:
 *     summary: Identifica entradas com ruturas de stock frequentes.
 *     responses:
 *       200:
 *         description: Retorna uma lista de entradas com ruturas frequentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 frequentStockBreaks:
 *                   type: number
 *                   description: Número de ruturas frequentes.
 */
router.get("/stock-breaks", (req, res) => {
  try {
    if (dataStorage.isEmpty()) {
      return res.status(404).json({ error: "Nenhum dado disponível para análise." });
    }
    const strategy = new FrequentStockBreaksStrategy();
    const result = dataStorage.analyzeData(strategy);
    res.json({ frequentStockBreaks: result });
  } catch (error) {
    console.error("Erro em /stock-breaks:", error.message);
    res.status(500).json({ error: "Erro interno ao identificar ruturas de stock." });
  }
});

/**
 * @swagger
 * /analytics/classification:
 *   get:
 *     summary: Classifica o desempenho geral dos dados analíticos.
 *     responses:
 *       200:
 *         description: Retorna a classificação geral de desempenho.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 performanceClassification:
 *                   type: string
 *                   description: Classificação do desempenho geral.
 */
router.get("/classification", (req, res) => {
  try {
    if (dataStorage.isEmpty()) {
      return res.status(404).json({ error: "Nenhum dado disponível para análise." });
    }
    const strategy = new GeneralPerformanceClassificationStrategy();
    const result = dataStorage.analyzeData(strategy);
    res.json({ performanceClassification: result });
  } catch (error) {
    console.error("Erro em /classification:", error.message);
    res.status(500).json({ error: "Erro interno ao classificar desempenho." });
  }
});

/**
 * @swagger
 * /analytics/list:
 *   get:
 *     summary: Lista os tipos de métricas disponíveis.
 *     responses:
 *       200:
 *         description: Retorna uma lista das métricas qualitativas e quantitativas disponíveis.
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
 *                         description: Nome da métrica qualitativa.
 *                 quantAnalytics:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Nome da métrica quantitativa.
 */
router.get("/list", (req, res) => {
  res.json({
    qualAnalytics: [{ name: "Feedback_formador", type: "text/plain" }],
    quantAnalytics: [
      { name: "Tempo_decisão", type: "integer" },
      { name: "Precisao_encomendas", type: "percentage" },
      { name: "Taxa_cumprimento_vendas", type: "percentage" },
      { name: "Volume_final_stock", type: "integer" },
    ],
  });
});

/**
 * @swagger
 * /analytics:
 *   post:
 *     summary: Retorna dados analíticos simulados para um activityID específico.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnalyticsRequest'
 *     responses:
 *       200:
 *         description: Retorna dados analíticos simulados.
 */
router.post("/", (req, res) => {
  const { activityID } = req.body;

  if (!activityID) {
    return res.status(400).json({ error: "O campo activityID é obrigatório." });
  }

  const analyticsData = analyticsMock.map((entry) => ({
    activityID,
    inveniraStdID: entry.inveniraStdID,
    quantAnalytics: entry.quantAnalytics,
    qualAnalytics: entry.qualAnalytics,
  }));

  res.json(analyticsData);
});

module.exports = router;