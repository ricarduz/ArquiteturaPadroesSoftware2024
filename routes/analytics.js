const express = require("express");
const router = express.Router();

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
  res.send(
    "O Ricardo indica que Analytics endpoint está a funcionar! Use /analytics/list ou POST para /analytics para pedidos específicos."
  );
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
