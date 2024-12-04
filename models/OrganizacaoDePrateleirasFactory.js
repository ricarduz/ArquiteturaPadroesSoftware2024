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
        <a href="/tests/organizacaoprateleiras" target="_blank">Resultados dos Testes - Organização de Prateleiras</a>
      </body>
    </html>
  `);
});

module.exports = { OrganizacaoDePrateleirasFactory, router };
