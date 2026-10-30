import AlunoController from "../controller/aluno-controller.js";
import {
  enviarJson,
  enviarSemConteudo
} from "../utils/http.js";

// Analisa a requisição e decide qual código executar.
// Retorna true se alguma rota foi encontrada e false caso contrário.
export async function tratarRotas(req, res) {
  // req.url contém só o caminho (ex.: /api/alunos);
  // o objeto URL precisa de um endereço base para funcionar.
  const url = new URL(
    req.url,
    `http://${req.headers.host || "localhost"}`
  );

  // pathname representa somente o caminho da URL.
  const caminho = url.pathname;

  // Método HTTP utilizado: GET, POST, PUT, DELETE...
  const metodo = req.method;

  // O navegador pode enviar OPTIONS antes da requisição principal (CORS).
  if (metodo === "OPTIONS") {
    enviarSemConteudo(res);
    return true;
  }

  // Verifica se o servidor está funcionando.
  if (metodo === "GET" && caminho === "/api/health") {
    enviarJson(res, 200, {
      status: "ok",
      mensagem: "Servidor funcionando."
    });

    return true;
  }

  // GET /api/alunos -> AlunoController.listar()
  if (metodo === "GET" && caminho === "/api/alunos") {
    AlunoController.listar(req, res);
    return true;
  }

  // POST /api/alunos -> AlunoController.cadastrar()
  if (metodo === "POST" && caminho === "/api/alunos") {
    await AlunoController.cadastrar(req, res);
    return true;
  }

  return false;
}
