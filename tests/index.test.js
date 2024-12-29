/**
 * index.test.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Agregador de testes para Produtos, Fábricas e Endpoints.
 */

const assert = require("assert");
const request = require("supertest");
const app = require("../app");
const GestaoDeStockFactory = require("../models/GestaoDeStockFactory");
const OrganizacaoDePrateleirasFactory = require("../models/OrganizacaoDePrateleirasFactory");
const GestaoDeStock = require("../models/GestaoDeStock");
const OrganizacaoDePrateleiras = require("../models/OrganizacaoDePrateleiras");

/**
 * Testes relacionados a Produtos
 */
describe("Teste de Produtos", () => {
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

  describe("Factory", () => {
    it("Deve criar uma atividade através do Gestão de Stock", () => {
      const factory = new GestaoDeStockFactory();
      const atividade = factory.createActivity({
        name: "Teste",
        description: "Teste descrição",
        stockLevel: 50,
      });
      assert.strictEqual(atividade.stockLevel, 50);
    });

    it("Deve criar uma atividade através do Organização de Prateleiras", () => {
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

/**
 * Testes relacionados ao Endpoint /deploy
 */
describe("Testes do Endpoint /deploy", () => {
  it("Deve criar uma atividade de Gestão de Stock com sucesso", async () => {
    const response = await request(app)
      .post("/deploy")
      .send({
        activityType: "GestaoDeStock",
        name: "Teste Gestão de Stock",
        description: "Descrição da atividade de gestão de stock",
        params: { stockLevel: 100 },
      });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.activityDetails.name, "Teste Gestão de Stock");
    assert.strictEqual(response.body.activityDetails.stockLevel, 100);
  });

  it("Deve criar uma atividade de Organização de Prateleiras com sucesso", async () => {
    const response = await request(app)
      .post("/deploy")
      .send({
        activityType: "OrganizacaoDePrateleiras",
        name: "Teste Organização de Prateleiras",
        description: "Descrição da atividade de organização de prateleiras",
        params: { shelfLayout: "Layout Inicial" },
      });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.activityDetails.name, "Teste Organização de Prateleiras");
    assert.strictEqual(response.body.activityDetails.shelfLayout, "Layout Inicial");
  });

  it("Deve retornar erro ao enviar parâmetros inválidos", async () => {
    const response = await request(app)
      .post("/deploy")
      .send({
        activityType: "TipoInvalido",
        name: "Atividade Invalida",
        description: "Teste com tipo inválido",
        params: {},
      });

    assert.strictEqual(response.status, 400);
    assert.ok(response.body.error);
  });
});

/**
 * Testes relacionados ao Endpoint /config
 */
describe("Testes do Endpoint /config", () => {
  it("Deve retornar os parâmetros adaptados com sucesso", async () => {
    const response = await request(app).get("/config");

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.stockLevel, 100);
    assert.strictEqual(response.body.salesGoal, 200);
    assert.strictEqual(response.body.campaignDuration, 7);
    assert.strictEqual(response.body.scenarioDescription, "Campanha de Natal");
  });

  it("Deve retornar erro ao enviar parâmetros inválidos para POST /config", async () => {
    const response = await request(app).post("/config").send({
      nivel_stock_inicial: "invalido",
      objetivo_vendas: "invalido",
      duracao_campanha: "invalido",
      descricao_cenario: 12345,
    });

    assert.strictEqual(response.status, 400);
    assert.ok(response.text.includes("Erro"));
  });
});
