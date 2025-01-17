/**
 * deployController.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Gestão da criação de instâncias de atividades.
 */

const GestaoDeStockFactory = require("../models/GestaoDeStockFactory");
const OrganizacaoDePrateleirasFactory = require("../models/OrganizacaoDePrateleirasFactory");

exports.createDeployment = (req, res) => {
  const { activityType, name, description, params } = req.body;

  // Log para auditoria
  console.log(`POST /deploy received:`, req.body);

  // Validação básica dos dados recebidos
  if (!activityType || !name || !description || !params) {
    const errorResponse = {
      error: "Missing required fields. Ensure activityType, name, description, and params are provided.",
    };
    console.error(`Validation Error:`, errorResponse);
    return res.status(400).json(errorResponse);
  }

  let activity;
  try {
    // Criar a instância com base no tipo de atividade
    switch (activityType) {
      case "GestaoDeStock":
        if (!params.stockLevel) {
          const errorResponse = { error: "Missing stockLevel for GestaoDeStock." };
          console.error(`Validation Error:`, errorResponse);
          return res.status(400).json(errorResponse);
        }
        const gestaoFactory = new GestaoDeStockFactory();
        activity = gestaoFactory.createActivity({ name, description, stockLevel: params.stockLevel });
        break;

      case "OrganizacaoDePrateleiras":
        if (!params.shelfLayout) {
          const errorResponse = { error: "Missing shelfLayout for OrganizacaoDePrateleiras." };
          console.error(`Validation Error:`, errorResponse);
          return res.status(400).json(errorResponse);
        }
        const organizacaoFactory = new OrganizacaoDePrateleirasFactory();
        activity = organizacaoFactory.createActivity({
          name,
          description,
          shelfLayout: params.shelfLayout,
        });
        break;

      default:
        const errorResponse = {
          error: `Unknown activity type: ${activityType}. Supported types are GestaoDeStock and OrganizacaoDePrateleiras.`,
        };
        console.error(`Validation Error:`, errorResponse);
        return res.status(400).json(errorResponse);
    }

    // Detalhes da atividade criada
    const activityDetails = activity.getDetails();
    console.log(`Activity created successfully:`, activityDetails);

    // Retornar os detalhes da atividade criada
    return res.status(200).json({ activityDetails });
  } catch (error) {
    console.error("Error creating activity:", error.message);
    return res.status(500).json({ error: "Failed to create activity. Internal server error." });
  }
};
