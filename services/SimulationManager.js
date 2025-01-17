/**
 * SimulationManager.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Gerencia as simulações e aplica estratégias de análise.
 */
const PerformanceAverageStrategy = require("../strategies/PerformanceAverageStrategy");
const FrequentStockBreaksStrategy = require("../strategies/FrequentStockBreaksStrategy");
const GeneralPerformanceClassificationStrategy = require("../strategies/GeneralPerformanceClassificationStrategy");

class SimulationManager {
  constructor() {
    // Registra as estratégias disponíveis
    this.strategies = {
      average: new PerformanceAverageStrategy(),
      stockBreaks: new FrequentStockBreaksStrategy(),
      classification: new GeneralPerformanceClassificationStrategy(),
    };
  }

  /**
   * Executa a análise com a estratégia especificada.
   * @param {string} strategyKey - Chave da estratégia a ser usada.
   * @param {Array<number>} data - Dados para análise.
   * @returns {*} Resultado da análise.
   * @throws {Error} Se a estratégia não for encontrada ou os dados forem inválidos.
   */

  analyze(strategyKey, data) {
    const strategy = this.strategies[strategyKey];
    if (!strategy) {
      throw new Error(
        `Estratégia "${strategyKey}" não encontrada. Estratégias disponíveis: ${Object.keys(this.strategies).join(", ")}`
      );
    }
    if (!Array.isArray(data) || !data.every((item) => typeof item === "number")) {
      throw new Error("Os dados devem ser um array numérico, ex: [10, 20, 30].");
    }

    // Log de execução para depuração
    console.log(`Executando estratégia: ${strategyKey} com dados:`, data);

    return strategy.execute(data);
  }
}

module.exports = SimulationManager;
