/**
 * DeployController.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Gestão da criação de instâncias de atividades.
 */

const GestaoDeStockFactory = require("../models/GestaoDeStockFactory");
const OrganizacaoDePrateleirasFactory = require("../models/OrganizacaoDePrateleirasFactory");

exports.createDeployment = (req, res) => {
  const { activityType, name, description, params } = req.body;

  // Validação básica dos dados recebidos
  if (!activityType || !name || !description || !params) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let activity;
  try {
    // Criar a instância com base no tipo de atividade
    switch (activityType) {
      case "GestaoDeStock":
        const gestaoFactory = new GestaoDeStockFactory();
        activity = gestaoFactory.createActivity({ name, description, stockLevel: params.stockLevel });
        break;

      case "OrganizacaoDePrateleiras":
        const organizacaoFactory = new OrganizacaoDePrateleirasFactory();
        activity = organizacaoFactory.createActivity({ name, description, shelfLayout: params.shelfLayout });
        break;

      default:
        return res.status(400).json({ error: `Unknown activity type: ${activityType}` });
    }

    // Retornar os detalhes da atividade criada
    res.status(200).json({ activityDetails: activity.getDetails() });
  } catch (error) {
    console.error("Error creating activity:", error.message);
    res.status(500).json({ error: "Failed to create activity" });
  }
};
