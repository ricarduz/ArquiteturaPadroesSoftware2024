/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Criador Concreto - implementa a criação de atividades para Organização de Prateleiras.
 */

// Importações necessárias
const express = require("express");
const ActivityFactory = require("./ActivityFactory");
const OrganizacaoDePrateleiras = require("./OrganizacaoDePrateleiras");

// Inicializa o router do Express
const router = express.Router();

class OrganizacaoDePrateleirasFactory extends ActivityFactory {
  /**
   * Cria uma nova atividade de Organização de Prateleiras.
   * @param {Object} params - Parâmetros para criar atividade.
   * @param {string} params.name - Nome da atividade.
   * @param {string} params.description - Descrição da atividade.
   * @param {string} params.shelfLayout - Layout inicial das prateleiras.
   * @returns {OrganizacaoDePrateleiras} Nova instância da atividade.
   */
  createActivity({ name, description, shelfLayout }) {
    if (!name || !description || !shelfLayout) {
      throw new Error("Todos os campos são obrigatórios: name, description, shelfLayout.");
    }
    return new OrganizacaoDePrateleiras(name, description, shelfLayout);
  }
}

// Define as rotas para este factory

// Rota principal: verifica se o endpoint está funcionando
router.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>Endpoint de Organização de Prateleiras está funcionando!</h2>
        <p>Use POST para criar uma nova atividade.</p>
      </body>
    </html>
  `);
});

// Rota para criar uma nova atividade via POST
router.post("/", (req, res) => {
  try {
    const { name, description, shelfLayout } = req.body;

    // Validação básica dos parâmetros
    if (!name || !description || !shelfLayout) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios: name, description, shelfLayout." });
    }

    // Criação da fábrica e da atividade
    const factory = new OrganizacaoDePrateleirasFactory();
    const activity = factory.createActivity({ name, description, shelfLayout });

    // Retorno da atividade criada
    res.status(201).json({
      message: "Atividade de Organização de Prateleiras criada com sucesso!",
      activity: activity.getDetails(),
    });
  } catch (error) {
    // Captura erros na criação da atividade
    res.status(500).json({ error: error.message });
  }
});

// Exportação do router e da classe
module.exports = router;

