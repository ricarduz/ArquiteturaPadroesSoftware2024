/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Criador Concreto - implementa a criação de atividades para Organização de Prateleiras.
 */

// Importação das dependências
const ActivityFactory = require("./ActivityFactory");
const OrganizacaoDePrateleiras = require("./OrganizacaoDePrateleiras");
const express = require("express"); // Para definir rotas específicas do módulo
const router = express.Router(); // Criação do roteador para endpoints relacionados

// Definição da classe concreta que extende a ActivityFactory
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
  // Validação dos campos enviados no corpo da requisição
  const { name, description, shelfLayout } = req.body;

  if (!name || !description || !shelfLayout) {
    return res.status(400).json({
      error: "Todos os campos são obrigatórios: name, description, shelfLayout.",
    });
  }

  try {
    // Instância do factory para criar a atividade
    const factory = new OrganizacaoDePrateleirasFactory();
    const activity = factory.createActivity({ name, description, shelfLayout });

    // Resposta de sucesso com os detalhes da atividade criada
    res.status(201).json({
      message: "Atividade de Organização de Prateleiras criada com sucesso!",
      activity: activity.getDetails(),
    });
  } catch (error) {
    // Resposta de erro caso ocorra algum problema
    res.status(500).json({
      error: "Erro ao criar a atividade de Organização de Prateleiras.",
      details: error.message,
    });
  }
});

// Exportação da classe e do roteador
module.exports = { OrganizacaoDePrateleirasFactory, router };
