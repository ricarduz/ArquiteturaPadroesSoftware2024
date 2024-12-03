const GestaoDeStockFactory = require("./models/GestaoDeStockFactory");
const OrganizacaoDePrateleirasFactory = require("./models/OrganizacaoDePrateleirasFactory");

// Criador Concreto para Gestão de stock
const gestaoFactory = new GestaoDeStockFactory();
const atividadeStock = gestaoFactory.createActivity({
  name: "Gestão de Stock",
  description: "Gestão de stock inicial.",
  stockLevel: 100,
});

console.log("Atividade de Gestão de stock:");
console.log(atividadeStock.getDetails());
atividadeStock.execute();

// Criador Concreto para Organização de Prateleiras
const organizacaoFactory = new OrganizacaoDePrateleirasFactory();
const atividadePrateleiras = organizacaoFactory.createActivity({
  name: "Organização de Prateleiras",
  description: "Otimização do layout das prateleiras.",
  shelfLayout: "Layout Inicial",
});

console.log("\nAtividade de Organização de Prateleiras:");
console.log(atividadePrateleiras.getDetails());
atividadePrateleiras.execute();

