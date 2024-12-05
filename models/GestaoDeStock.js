/**
 * GestaoDeStocks.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Produto Concreto - define uma atividade específica para gestão de stock.
 * */

const Activity = require("./Activity");

class GestaoDeStock extends Activity {
  /**
   * Construtor da classe GestaoDeStock.
   * 
   * @param {string} name - Nome da atividade.
   * @param {string} description - Descrição da atividade.
   * @param {number} stockLevel - Nível inicial de Stock.
   */
  constructor(name, description, stockLevel) {
    super(name, description);
    this.stockLevel = stockLevel;
  }

  /**
   * Retorna os detalhes da atividade.
   * 
   * @returns {Object} Detalhes da atividade.
   */
  getDetails() {
    return {
      name: this.name,
      description: this.description,
      stockLevel: this.stockLevel,
    };
  }

  /**
   * Executa a lógica principal para gestão de Stock.
   */
  execute() {
    console.log(`Executando a atividade: ${this.name}`);
    console.log(`Gerenciando stock com nível inicial: ${this.stockLevel}`);
  }
}

module.exports = GestaoDeStock;
