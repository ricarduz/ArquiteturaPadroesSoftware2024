/** 
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Testes para verificar a funcionalidade dos produtos e criadores.
 */

const GestaoDeStockFactory = require("./models/GestaoDeStockFactory");
const OrganizacaoDePrateleirasFactory = require("./models/OrganizacaoDePrateleirasFactory");
const GestaoDeStock = require("./models/GestaoDeStock");
const OrganizacaoDePrateleiras = require("./models/OrganizacaoDePrateleiras");

console.log("===== Testando Produtos Concretos =====");
// Produto: Gestão de Stocks
const atividadeStock = new GestaoDeStock(
  "Gestão de Stocks",
  "Atividade para gerenciar o stock inicial.",
  100
);
console.log("\nDetalhes da Gestão de Stocks:");
console.log(atividadeStock.getDetails());
atividadeStock.execute();

// Produto: Organização de Prateleiras
const atividadePrateleiras = new OrganizacaoDePrateleiras(
  "Organização de Prateleiras",
  "Atividade para otimizar o layout das prateleiras.",
  "Layout Inicial"
);
console.log("\nDetalhes da Organização de Prateleiras:");
console.log(atividadePrateleiras.getDetails());
atividadePrateleiras.execute();

console.log("\n===== Testando Criadores Concretos =====");
// Criador Concreto: Gestão de Stock
const gestaoFactory = new GestaoDeStockFactory();
const atividadeStockCriada = gestaoFactory.createActivity({
  name: "Gestão de Stock Avançada",
  description: "Gerenciamento avançado de Stocks.",
  stockLevel: 200,
});
console.log("\nAtividade Criada - Gestão de Stocks:");
console.log(atividadeStockCriada.getDetails());
atividadeStockCriada.execute();

// Criador Concreto: Organização de Prateleiras
const organizacaoFactory = new OrganizacaoDePrateleirasFactory();
const atividadePrateleirasCriada = organizacaoFactory.createActivity({
  name: "Reorganização de Prateleiras",
  description: "Redefinição do layout para otimização.",
  shelfLayout: "Layout Atualizado",
});
console.log("\nAtividade Criada - Organização de Prateleiras:");
console.log(atividadePrateleirasCriada.getDetails());
atividadePrateleirasCriada.execute();
