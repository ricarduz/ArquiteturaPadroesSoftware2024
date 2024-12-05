/**
 * OrganizacaoDePrateleirasFactory.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Factory para criar instâncias da classe OrganizacaoDePrateleiras.
 */
const express = require("express");
const router = express.Router();

const ActivityFactory = require("./ActivityFactory");
const OrganizacaoDePrateleiras = require("./OrganizacaoDePrateleiras");

class OrganizacaoDePrateleirasFactory {
  /**
   * Cria uma nova instância de OrganizacaoDePrateleiras.
   * 
   * @param {Object} params - Parâmetros para criar a atividade.
   * @param {string} params.name - Nome da atividade.
   * @param {string} params.description - Descrição da atividade.
   * @param {string} params.shelfLayout - Layout inicial das prateleiras.
   * @returns {OrganizacaoDePrateleiras} Instância criada.
   */
  createActivity({ name, description, shelfLayout }) {
    if (!name || !description || !shelfLayout) {
      throw new Error("Todos os parâmetros (name, description, shelfLayout) são obrigatórios.");
    }

    return new OrganizacaoDePrateleiras(name, description, shelfLayout);
  }
}

// Endpoint para verificar funcionamento
router.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>O Ricardo indica que o endpoint de Organização de Prateleira está a funcionar!</h2>
        <p>Para abrir os testes realizados, use: 
          <a href="/tests/mochawesome.html" target="_blank">Testes de Organização de Prateleira</a>
        </p>
      </body>
    </html>
  `);
});

module.exports = { OrganizacaoDePrateleirasFactory, router };