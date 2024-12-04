/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Criador Concreto - implementa a criação de atividades para Gestão de Stock.
 */

const ActivityFactory = require("./ActivityFactory");
const GestaoDeStock = require("./GestaoDeStock");

// Importação do Express para definir a rota de funcionamento
const express = require("express");
const router = express.Router();

class GestaoDeStockFactory extends ActivityFactory {
  /**
   * Método responsável pela criação de uma nova atividade de Gestão de Stock.
   * @param {Object} params - Parâmetros necessários para criar a atividade.
   * @param {string} params.name - Nome da atividade.
   * @param {string} params.description - Descrição da atividade.
   * @param {number} params.stockLevel - Nível inicial de stock.
   * @returns {GestaoDeStock} - Instância da atividade de Gestão de Stock.
   */
  createActivity({ name, description, stockLevel }) {
    return new GestaoDeStock(name, description, stockLevel);
  }
}

// Rota para indicar que o endpoint está funcionando
router.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>O Ricardo indica que o endpoint de Gestão de Stock está a funcionar!</h2>
        <p>Use POST para criar uma nova atividade.</p>
        <p>Para visualizar os resultados dos testes de Gestão de Stock, clique no link abaixo:</p>
        <a href="/tests/gestaodestock" target="_blank">Resultados dos Testes - Gestão de Stock</a>
      </body>
    </html>
  `);
});

module.exports = { GestaoDeStockFactory, router };
