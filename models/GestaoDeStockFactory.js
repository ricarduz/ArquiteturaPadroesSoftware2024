/**
 * GestaoDeStockFactory.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Criador Concreto - implementa a criação de atividades para Gestão de Stock.
 */
const express = require("express");
const router = express.Router();
const GestaoDeStock = require("./GestaoDeStock");

const ActivityFactory = require("./ActivityFactory");

class GestaoDeStockFactory {
  /**
   * Cria uma nova atividade de Gestão de Stock.
   * 
   * @param {Object} params - Parâmetros para a criação da atividade.
   * @param {string} params.name - Nome da atividade.
   * @param {string} params.description - Descrição da atividade.
   * @param {number} params.stockLevel - Nível inicial de Stock.
   * @returns {GestaoDeStock} Instância de GestaoDeStock.
   */
  createActivity({ name, description, stockLevel }) {
    if (!name || !description || typeof stockLevel !== "number") {
      throw new Error("Todos os parâmetros (name, description, stockLevel) são obrigatórios.");
    }
    return new GestaoDeStock(name, description, stockLevel);
  }
}

/**
 * @swagger
 * tags:
 *   name: GestaoDeStock
 *   description: Endpoints relacionados à Gestão de Stocks.
 */

/**
 * @swagger
 * /gestaodestock:
 *   get:
 *     summary: Verifica o funcionamento do endpoint de Gestão de Stocks.
 *     tags: [GestaoDeStock]
 *     responses:
 *       200:
 *         description: Endpoint funcionando corretamente.
 */

// Endpoint para verificar funcionamento
router.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>O Ricardo indica que o endpoint de Gestão de Stock está a funcionar!</h2>
        <p>Para abrir os testes realizados, use: 
          <a href="/tests/mochawesome.html" target="_blank">Testes de Gestão de Stock</a>
        </p>
      </body>
    </html>
  `);
});

module.exports = { GestaoDeStockFactory, router };