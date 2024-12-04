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

// Rota para indicar que o endpoint está funcionando
router.get("/", (req, res) => {
  res.send(
    "O Ricardo indica que o endpoint de Gestão de Stock está a funcionar! Use POST para criar uma nova atividade."
  );
});

module.exports = { GestaoDeStockFactory, router };
