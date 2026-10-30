// Módulo HTTP nativo do Node.js: não precisa ser instalado.
import http from "node:http";

import { tratarRotas } from "./routes/aluno-routes.js";
import { enviarJson } from "./utils/http.js";

// process.env.PORT será usado no deploy (Render);
// no desenvolvimento local a porta é 3000.
const PORTA = Number(process.env.PORT) || 3000;

// 0.0.0.0 permite que o servidor seja acessível pelo ambiente de hospedagem.
const HOST = "0.0.0.0";

// createServer() cria o servidor HTTP; a função é executada
// toda vez que o servidor recebe uma nova requisição.
const servidor = http.createServer(async (req, res) => {
  try {
    const rotaEncontrada = await tratarRotas(req, res);

    // Nenhuma rota correspondeu: responde 404.
    if (!rotaEncontrada) {
      enviarJson(res, 404, {
        sucesso: false,
        mensagem: "Rota não encontrada."
      });
    }
  } catch (erro) {
    // O erro fica no terminal; detalhes internos não vão para o usuário.
    console.error("Erro interno do servidor:", erro);

    enviarJson(res, 500, {
      sucesso: false,
      mensagem: "Erro interno do servidor."
    });
  }
});

// listen() inicia o servidor, que fica aguardando requisições.
servidor.listen(PORTA, HOST, () => {
  console.log(
    `Servidor disponível em http://localhost:${PORTA}`
  );
});
