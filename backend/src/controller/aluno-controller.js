import AlunoModel from "../model/aluno-model.js";
import {
  enviarJson,
  lerCorpoJson
} from "../utils/http.js";

// Controller: recebe as solicitações encaminhadas pelas rotas
// e faz a ligação entre a requisição HTTP, o Model e a resposta JSON.
const AlunoController = {
  // Executado em GET /api/alunos.
  listar(req, res) {
    const alunos = AlunoModel.listar();

    enviarJson(res, 200, {
      total: alunos.length,
      dados: alunos
    });
  },

  // Executado em POST /api/alunos.
  // async: a leitura do corpo da requisição é assíncrona.
  async cadastrar(req, res) {
    try {
      // Aguarda a leitura e a conversão do JSON recebido.
      const dados = await lerCorpoJson(req);

      const resultado = AlunoModel.cadastrar(dados);

      if (!resultado.sucesso) {
        enviarJson(res, resultado.status, {
          sucesso: false,
          mensagem: resultado.mensagem
        });
        return;
      }

      // 201: um novo recurso foi criado.
      enviarJson(res, resultado.status, {
        sucesso: true,
        mensagem: "Aluno cadastrado com sucesso.",
        dados: resultado.aluno
      });
    } catch (erro) {
      // Por exemplo, quando o cliente envia um JSON inválido.
      enviarJson(res, 400, {
        sucesso: false,
        mensagem: "O corpo da requisição contém um JSON inválido."
      });
    }
  }
};

export default AlunoController;
