/** 
 * DataStorage.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Serviço do armazenamento de dados e análises.
 */

const SimulationManager = require("./SimulationManager");

class DataStorage {
  constructor() {
    this.simulationManager = new SimulationManager(); // Instância do gestor de simulação
    this.data = []; // Dados analíticos armazenados
  }

  /**
   * Adiciona uma nova entrada de dados ao armazenamento.
   * @param {Object} dataEntry - Entrada de dados a ser adicionada.
   */
  addData(dataEntry) {
    if (!dataEntry) {
      throw new Error("Data entry cannot be null or undefined.");
    }
    this.data.push(dataEntry);
  }

  /**
   * Define a estratégia de análise no SimulationManager.
   * @param {Object} strategy - Estratégia de análise a ser usada.
   */
  setAnalysisStrategy(strategy) {
    this.simulationManager.setAnalysisStrategy(strategy);
  }

  /**
   * Executa a análise sobre os dados armazenados.
   * @returns {*} Resultado da análise.
   */
  executeAnalysis() {
    if (this.data.length === 0) {
      throw new Error("No data available for analysis.");
    }
    return this.simulationManager.executeAnalysis(this.data);
  }

  /**
   * Retorna todos os dados armazenados.
   * @returns {Array} Dados armazenados.
   */
  getAllData() {
    return this.data;
  }

  /**
   * Limpa todos os dados armazenados.
   */
  clearData() {
    this.data = [];
  }
}

module.exports = DataStorage;
