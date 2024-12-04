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
  res.send(`
    <html>
      <body>
        <h2>O Ricardo indica que o endpoint de Organização de Prateleiras está a funcionar!</h2>
        <p>Use POST para criar uma nova atividade.</p>
        <p>Para visualizar os resultados dos testes de Organização de Prateleiras, clique no link abaixo:</p>
        <a href="/tests/organizacaodeprateleiras" target="_blank">Resultados dos Testes - Organização de Prateleiras</a>
      </body>
    </html>
  `);
});

// Rota para criar uma nova atividade via POST
router.post("/", (req, res) => {
  const { name, description, shelfLayout } = req.body;
  if (!name || !description || !shelfLayout) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios: name, description, shelfLayout." });
  }

  const factory = new OrganizacaoDePrateleirasFactory();
  const activity = factory.createActivity({ name, description, shelfLayout });

  res.status(201).json({
    message: "Atividade de Organização de Prateleiras criada com sucesso!",
    activity: activity.getDetails(),
  });
});

module.exports = { OrganizacaoDePrateleirasFactory, router };
