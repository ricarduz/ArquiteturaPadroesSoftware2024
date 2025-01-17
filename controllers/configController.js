/**
 * configController.js
 * Autor: Ricardo Isaias Serafim
 * Email: 2302605@estudante.uab.pt
 * Descrição: Controlador para gerenciamento das rotas de configuração.
 */

const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");

/**
 * @swagger
 * /deploy:
 *   post:
 *     summary: Cria uma nova instância de simulação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Deployment'
 *     responses:
 *       200:
 *         description: URL da instância criada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activity_url:
 *                   type: string
 *                   description: URL da simulação criada
 */
router.post("/", configController.createDeployment);

module.exports = router;
