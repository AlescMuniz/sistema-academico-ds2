import AlunoModel from "../model/aluno-model.js";

// Controller: recebe as requisições encaminhadas pelo Router,
// chama o Model e produz a resposta.
const AlunoController = {
  // GET /api/alunos
  listar(req, res) {
    const alunos = AlunoModel.listar();

    return res.status(200).json({
      total: alunos.length,
      dados: alunos
    });
  },

  // POST /api/alunos
  cadastrar(req, res) {
    // express.json() já converteu o JSON recebido; o resultado está em req.body.
    const dados = req.body;

    const resultado = AlunoModel.cadastrar(dados);

    // O Model encontrou algum problema de validação.
    if (!resultado.sucesso) {
      return res.status(resultado.status).json({
        sucesso: false,
        mensagem: resultado.mensagem
      });
    }

    // 201: o aluno foi criado com sucesso.
    return res.status(201).json({
      sucesso: true,
      mensagem: "Aluno cadastrado com sucesso.",
      dados: resultado.aluno
    });
  }
};

export default AlunoController;
