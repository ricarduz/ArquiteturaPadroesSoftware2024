/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Criador Abstrato - define a interface para os criadores concretos de atividades.
 */
class ActivityFactory {
    /**
     * Método Factory para criar uma atividade.
     * Deve ser implementado pelas subclasses.
     * 
     * @param {Object} params - Parâmetros necessários para criar a atividade.
     * @returns {Activity} Instância de uma classe concreta que herda de Activity.
     */
    createActivity(params) {
      throw new Error("O método 'createActivity()' deve ser implementado.");
    }
  }
  
  module.exports = ActivityFactory;
   
