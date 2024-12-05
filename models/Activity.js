/**
 * Activity.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Produto abstrato - Define uma interface comum para todas as atividades no sistema 
 */
class Activity {
    constructor(name, description) {
      this.name = name;
      this.description = description;
    }
  
    /**
     * Retorna os detalhes básicos da atividade.
     */
    getDetails() {
      throw new Error("O método 'getDetails()' deve ser implementado.");
    }
  
    /**
     * Executa a lógica principal da atividade.
     */
    execute() {
      throw new Error("O método 'execute()' deve ser implementado.");
    }
  }
  
  module.exports = Activity;
   
