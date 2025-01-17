/**
 * GeneralPerformanceClassificationStrategy.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Classifica o desempenho geral com base nos dados fornecidos.
 */

class GeneralPerformanceClassificationStrategy {
  /**
   * Classifica o desempenho geral com base na média dos dados.
   * @param {Array<number>} data - Lista de valores numéricos.
   * @returns {string} Classificação do desempenho ou mensagem amigável.
   */
  execute(data) {
    if (!Array.isArray(data)) {
      return "Os dados fornecidos não são válidos. Certifique-se de enviar uma lista (array) de números.";
    }

    if (data.length === 0) {
      return "A lista de dados está vazia. Certifique-se de fornecer valores numéricos para análise.";
    }

    const average = data.reduce((sum, value) => sum + value, 0) / data.length;

    if (average > 90) {
      return "Desempenho classificado como: Excelente";
    }
    if (average > 75) {
      return "Desempenho classificado como: Bom";
    }
    return "Desempenho classificado como: Insatisfatório";
  }
}

module.exports = GeneralPerformanceClassificationStrategy;
