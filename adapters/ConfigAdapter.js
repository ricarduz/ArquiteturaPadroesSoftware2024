/**
 * ConfigAdapter.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Adaptador para converter parâmetros entre o formato Inven!RA e o formato interno.
 */

class ConfigAdapter {
    /**
     * Adapta parâmetros do formato Inven!RA para o formato interno.
     * @param {Object} invenraParams - Parâmetros no formato Inven!RA.
     * @returns {Object} Parâmetros no formato interno.
     */
    adaptInvenraParams(invenraParams) {
      return {
        stockLevel: invenraParams.nivel_stock_inicial,
        salesGoal: invenraParams.objetivo_vendas,
        campaignDuration: invenraParams.duracao_campanha,
        scenarioDescription: invenraParams.descricao_cenario,
      };
    }
  
    /**
     * Adapta parâmetros do formato interno para o formato Inven!RA.
     * @param {Object} internalParams - Parâmetros no formato interno.
     * @returns {Object} Parâmetros no formato Inven!RA.
     */
    adaptInternalParams(internalParams) {
      return {
        nivel_stock_inicial: internalParams.stockLevel,
        objetivo_vendas: internalParams.salesGoal,
        duracao_campanha: internalParams.campaignDuration,
        descricao_cenario: internalParams.scenarioDescription,
      };
    }
  }
  
  module.exports = ConfigAdapter;
  