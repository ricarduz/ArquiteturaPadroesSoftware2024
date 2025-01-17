/**
 * strategies.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Rotas para demonstração das estratégias no padrão de comportamento.
 */

const express = require("express");
const router = express.Router();
const FrequentStockBreaksStrategy = require("../strategies/FrequentStockBreaksStrategy");
const GeneralPerformanceClassificationStrategy = require("../strategies/GeneralPerformanceClassificationStrategy");
const PerformanceAverageStrategy = require("../strategies/PerformanceAverageStrategy");

// Estratégias disponíveis
const strategies = {
  strategyA: new FrequentStockBreaksStrategy(),
  strategyB: new GeneralPerformanceClassificationStrategy(),
  strategyC: new PerformanceAverageStrategy(),
};

/**
 * @swagger
 * /strategies/{strategyName}:
 *   get:
 *     summary: Executa uma estratégia específica.
 *     parameters:
 *       - in: path
 *         name: strategyName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [strategyA, strategyB, strategyC]
 *         description: Nome da estratégia para executar (strategyA, strategyB ou strategyC).
 *       - in: query
 *         name: data
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: number
 *         description: Dados numéricos a serem usados pela estratégia.
 *     responses:
 *       200:
 *         description: Resultado da execução da estratégia.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 strategy:
 *                   type: string
 *                   description: Nome da estratégia executada.
 *                 result:
 *                   type: any
 *                   description: Resultado da estratégia.
 *       400:
 *         description: Erro na validação dos dados fornecidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 *       404:
 *         description: Estratégia não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 */

// Rota para executar uma estratégia específica
router.get("/:strategyName", (req, res) => {
  const { strategyName } = req.params;
  const { data } = req.query;

  const strategy = strategies[strategyName];
  if (!strategy) {
    return res.status(404).json({ error: `Estratégia '${strategyName}' não encontrada.` });
  }

  if (!data) {
    return res.status(400).json({ error: "O parâmetro 'data' é obrigatório e deve ser um array de números." });
  }

  try {
    // Converter data para array de números
    const parsedData = Array.isArray(data)
      ? data.map(Number)
      : JSON.parse(data).map(Number);

    const result = strategy.execute(parsedData);
    res.json({ strategy: strategyName, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
