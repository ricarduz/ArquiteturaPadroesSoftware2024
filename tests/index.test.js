/**
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Agregador de testes
 */

const assert = require("assert");
const GestaoDeStockFactory = require("../models/GestaoDeStockFactory");
const OrganizacaoDePrateleirasFactory = require("../models/OrganizacaoDePrateleirasFactory");
const GestaoDeStock = require("../models/GestaoDeStock");
const OrganizacaoDePrateleiras = require("../models/OrganizacaoDePrateleiras");

describe("Teste de Produtos e Fábricas", () => {
  describe("Produtos", () => {
    it("Deve criar e executar uma atividade de Gestão de Stock", () => {
      const atividade = new GestaoDeStock(
        "Gestão de Stocks",
        "Descrição teste",
        100
      );
      assert.strictEqual(atividade.name, "Gestão de Stocks");
      assert.strictEqual(atividade.stockLevel, 100);
      atividade.execute();
    });

    it("Deve criar e executar uma atividade de Organização de Prateleiras", () => {
      const atividade = new OrganizacaoDePrateleiras(
        "Organização de Prateleiras",
        "Descrição teste",
        "Layout Inicial"
      );
      assert.strictEqual(atividade.name, "Organização de Prateleiras");
      assert.strictEqual(atividade.shelfLayout, "Layout Inicial");
      atividade.execute();
    });
  });

  describe("Fábricas", () => {
    it("Deve criar uma atividade através da fábrica de Gestão de Stock", () => {
      const factory = new GestaoDeStockFactory();
      const atividade = factory.createActivity({
        name: "Teste",
        description: "Teste descrição",
        stockLevel: 50,
      });
      assert.strictEqual(atividade.stockLevel, 50);
    });

    it("Deve criar uma atividade através da fábrica de Organização de Prateleiras", () => {
      const factory = new OrganizacaoDePrateleirasFactory();
      const atividade = factory.createActivity({
        name: "Teste",
        description: "Teste descrição",
        shelfLayout: "Layout Teste",
      });
      assert.strictEqual(atividade.shelfLayout, "Layout Teste");
    });
  });
});
