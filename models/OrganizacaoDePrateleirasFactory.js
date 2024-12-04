/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Criador Concreto - implementa a criação de atividades para Organização de Prateleiras.
 */

const ActivityFactory = require("./ActivityFactory");
const OrganizacaoDePrateleiras = require("./OrganizacaoDePrateleiras");

// Importação do Express para definir a rota de funcionamento
const express = require("express");
const router = express.Router();

class OrganizacaoDePrateleirasFactory extends ActivityFactory {
  /**
   * Cria uma nova atividade de Organização de Prateleiras.
   * 
   * @param {Object} params - Parâmetros para a criação da atividade.
   * @param {string} params.name - Nome da atividade.
   * @param {string} params.description - Descrição da atividade.
   * @param {string} params.shelfLayout - Layout inicial das prateleiras.
   * @returns {OrganizacaoDePrateleiras} Instância de OrganizacaoDePrateleiras.
   */
  createActivity({ name, description, shelfLayout }) {
    return new OrganizacaoDePrateleiras(name, description, shelfLayout);
  }
}

// Rota para indicar que o endpoint está funcionando
router.get("/", (req, res) => {
  res.send(
    "O Ricardo indica que o endpoint de Organização de Prateleiras está a funcionar! Use POST para criar uma nova atividade."
  );
});

module.exports = { OrganizacaoDePrateleirasFactory, router };
