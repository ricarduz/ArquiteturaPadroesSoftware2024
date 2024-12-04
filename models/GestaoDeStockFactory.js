/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Criador Concreto - implementa a criação de atividades para Gestão de Stock.
 */
const express = require("express");
const router = express.Router();

const ActivityFactory = require("./ActivityFactory");
const GestaoDeStock = require("./GestaoDeStock");

class GestaoDeStockFactory extends ActivityFactory {
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
    return new GestaoDeStock(name, description, stockLevel);
  }
}

// Endpoint para verificar funcionamento
router.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>O Ricardo indica que o endpoint de Gestão de Stocks está a funcionar!</h2>
        <p>Para abrir os testes realizados, use: 
          <a href="/tests/index.test" target="_blank">Testes de Gestão de Stocks</a>
        </p>
      </body>
    </html>
  `);
});

module.exports = { GestaoDeStockFactory, router };


