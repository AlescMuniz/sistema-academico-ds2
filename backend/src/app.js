// Configuração da aplicação Express: middlewares, rotas e tratamento de erros.
// A inicialização do servidor fica no server.js.
import express from "express";
import cors from "cors";

import alunoRoutes from "./routes/aluno-routes.js";

// app é o objeto principal de configuração da API.
const app = express();

// CORS: nesta fase, permite requisições de qualquer origem.
// No deploy, o "*" poderá ser restrito ao endereço do Netlify.
app.use(
  cors({
    origin: "*",

    // Métodos HTTP autorizados.
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],

    // Cabeçalhos que o frontend poderá enviar.
    // Authorization será usado futuramente no envio do token JWT.
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);

// Interpreta corpos JSON e disponibiliza o resultado em req.body.
app.use(express.json());

// Rota para verificar se a API está funcionando.
app.get("/api/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    mensagem: "Servidor Express funcionando."
  });
});

// Rotas dos alunos: todas recebem o prefixo /api/alunos.
app.use("/api/alunos", alunoRoutes);

// Executado quando nenhuma rota anterior corresponde à requisição.
app.use((req, res) => {
  return res.status(404).json({
    sucesso: false,
    mensagem: "Rota não encontrada."
  });
});

// Tratamento global de erros: um middleware de erro tem 4 parâmetros.
app.use((erro, req, res, next) => {
  // express.json() gera entity.parse.failed quando recebe um JSON inválido.
  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({
      sucesso: false,
      mensagem:
        "O corpo da requisição contém um JSON inválido."
    });
  }

  // Registra os detalhes no terminal.
  console.error("Erro interno do servidor:", erro);

  // Envia uma mensagem genérica ao cliente.
  return res.status(500).json({
    sucesso: false,
    mensagem: "Erro interno do servidor."
  });
});

// Exporta a aplicação para o server.js.
export default app;
