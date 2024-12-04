/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Criador Concreto - implementa a criação de atividades para Gestão de Stock.
 */

const express = require("express");
const ActivityFactory = require("./ActivityFactory");
const GestaoDeStock = require("./GestaoDeStock");

const router = express.Router();

class GestaoDeStockFactory extends ActivityFactory {
  /**
   * Cria uma nova atividade de Gestão de Stocks.
   * @param {Object} params - Parâmetros para criar a atividade.
   * @param {string} params.name - Nome da atividade.
   * @param {string} params.description - Descrição da atividade.
   * @param {number} params.stockLevel - Nível inicial de stock.
   * @returns {GestaoDeStock} Nova instância da atividade.
   */
  createActivity({ name, description, stockLevel }) {
    return new GestaoDeStock(name, description, stockLevel);
  }
}

// Rota principal para verificação do endpoint
router.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>O endpoint de Gestão de Stock está funcionando corretamente!</h2>
        <p>Use POST para criar uma nova atividade de Gestão de Stock.</p>
      </body>
    </html>
  `);
});

// Rota para criação de atividades via POST
router.post("/", (req, res) => {
  const { name, description, stockLevel } = req.body;

  // Validação dos parâmetros recebidos
  if (!name || !description || stockLevel === undefined) {
    return res.status(400).json({
      error: "Todos os campos são obrigatórios: name, description, stockLevel.",
    });
  }

  try {
    const factory = new GestaoDeStockFactory();
    const activity = factory.createActivity({ name, description, stockLevel });

    res.status(201).json({
      message: "Atividade de Gestão de Stock criada com sucesso!",
      activity: activity.getDetails(),
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar a atividade." });
  }
});

module.exports = { GestaoDeStockFactory, router };
