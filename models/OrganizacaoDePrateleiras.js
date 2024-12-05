/**
 * OrganizacaoDePrateleiras.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Produto concreto - define uma atividade específica para organização de prateleiras.
 */
const Activity = require("./Activity");

class OrganizacaoDePrateleiras extends Activity {
  /**
   * Construtor da classe OrganizacaoDePrateleiras.
   * 
   * @param {string} name - Nome da atividade.
   * @param {string} description - Descrição da atividade.
   * @param {string} shelfLayout - Layout inicial das prateleiras.
   */
  constructor(name, description, shelfLayout) {
    super(name, description);
    this.shelfLayout = shelfLayout;
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
      shelfLayout: this.shelfLayout,
    };
  }

  /**
   * Executa a lógica principal para organização de prateleiras.
   */
  execute() {
    console.log(`Executando a atividade: ${this.name}`);
    console.log(`Otimizando o layout das prateleiras: ${this.shelfLayout}`);
  }
}

module.exports = OrganizacaoDePrateleiras;