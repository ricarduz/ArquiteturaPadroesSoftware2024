/**
 * deployService.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Serviço responsável por gerar URLs dinâmicas.
 * Classe URLFactory
 */
class URLFactory {
    /**
     * Cria a URL de uma instância de simulação com base no `activityID`.
     *
     * @param {string} activityID - ID único da atividade
     * @returns {string} - URL da instância de simulação
     * @example
     * const instanceURL = URLFactory.createInstanceURL("123");
     * console.log(instanceURL); // http://localhost:3000/simulation/123
     */
    static createInstanceURL(activityID) {
      return `http://localhost:3000/simulation/${activityID}`;
    }
  }
  
  module.exports = URLFactory;
  
  