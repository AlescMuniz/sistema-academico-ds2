import express from "express";

import AlunoController
  from "../controller/aluno-controller.js";

// Um Router é um pequeno módulo de rotas.
const router = express.Router();

// GET /api/alunos (o prefixo é definido no app.js).
router.get(
  "/",
  AlunoController.listar
);

// POST /api/alunos
router.post(
  "/",
  AlunoController.cadastrar
);

// Exporta o Router para o app.js.
export default router;
