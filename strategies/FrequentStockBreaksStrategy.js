/** 
 * FrequentStockBreaksStrategy.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Estratégia para identificar ruturas de stock frequentes.
 */

class FrequentStockBreaksStrategy {
  /**
   * Executa a estratégia para identificar ruturas frequentes de stock.
   * @param {Array} data - Lista de itens a serem analisados.
   * @returns {string|number} Retorna o número de ruturas de stock ou uma mensagem amigável.
   */
  execute(data) {
    if (!Array.isArray(data)) {
      return "Os dados fornecidos não são válidos. Certifique-se de enviar uma lista (array) de itens.";
    }

    const stockBreaks = data.filter((item) => item.stockLevel === 0).length;

    if (stockBreaks === 0) {
      return "Nenhuma rutura de stock foi identificada.";
    }

    return `Foram identificadas ${stockBreaks} ruturas de stock.`;
  }
}

module.exports = FrequentStockBreaksStrategy;
