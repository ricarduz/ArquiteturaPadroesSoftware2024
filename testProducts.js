const GestaoDeStock = require("./models/GestaoDeStock");
const OrganizacaoDePrateleiras = require("./models/OrganizacaoDePrateleiras");

const atividadeStock = new GestaoDeStock(
  "Gestão de Estoque",
  "Atividade para gerenciar o estoque inicial.",
  100
);

const atividadePrateleiras = new OrganizacaoDePrateleiras(
  "Organização de Prateleiras",
  "Atividade para otimizar o layout das prateleiras.",
  "Layout Inicial"
);

console.log("Detalhes da Gestão de Estoque:");
console.log(atividadeStock.getDetails());
atividadeStock.execute();

console.log("\nDetalhes da Organização de Prateleiras:");
console.log(atividadePrateleiras.getDetails());
atividadePrateleiras.execute();

