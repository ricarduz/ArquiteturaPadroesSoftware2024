/**
 * Classe URLFactory
 * Responsável por criar URLs dinâmicas para instâncias de simulação e outros serviços relacionados.
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
  
  