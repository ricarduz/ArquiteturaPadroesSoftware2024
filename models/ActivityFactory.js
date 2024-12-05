/**
 * ActivityFactory.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Criador Abstrato - define a interface para os criadores concretos de atividades.
 */
class ActivityFactory {
    /**
     * Método Factory para criar uma atividade.
     * 
     * @param {Object} params - Parametros necessários para criar a atividade.
     * @returns {Activity} Instância de uma classe concreta que herda de Activity.
     */
    createActivity(params) {
      throw new Error("O método 'createActivity()' deve ser implementado.");
    }
  }

/**
 * @swagger
 * components:
 *   schemas:
 *     ActivityFactory:
 *       type: object
 *       description: Classe abstrata para criar atividades.
 *       properties:
 *         createActivity:
 *           type: function
 *           description: Método para instanciar uma atividade.
 */
 
  module.exports = ActivityFactory;
   
