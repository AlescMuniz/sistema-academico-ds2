// Alunos em memória, dentro do servidor.
// Ao encerrar o servidor os dados são apagados;
// futuramente este array será substituído por uma tabela MySQL.
const alunos = [];

// Model: dados e regras de cadastro dos alunos.
const AlunoModel = {
  // Converte o valor para texto e remove espaços no começo e no final.
  // null e undefined viram string vazia.
  normalizarTexto(valor) {
    if (valor === null || valor === undefined) {
      return "";
    }

    return String(valor).trim();
  },

  // Validação simples do e-mail (será melhorada em versões futuras).
  validarEmail(email) {
    return email.includes("@") && email.includes(".");
  },

  // find() devolve o primeiro aluno com o RA informado ou undefined.
  localizarPorRa(ra) {
    return alunos.find(aluno => aluno.ra === ra);
  },

  // Sem banco de dados, o ID é calculado a partir do maior ID existente.
  gerarProximoId() {
    if (alunos.length === 0) {
      return 1;
    }

    const ids = alunos.map(aluno => aluno.id);

    // O operador ... espalha os valores do array como argumentos.
    const maiorId = Math.max(...ids);

    return maiorId + 1;
  },

  // Cadastra um aluno. dados deve conter ra, nome, email, curso e turma.
  cadastrar(dados) {
    // ?. evita erro caso dados não tenha sido informado.
    const ra = AlunoModel.normalizarTexto(dados?.ra);
    const nome = AlunoModel.normalizarTexto(dados?.nome);
    const email = AlunoModel.normalizarTexto(dados?.email);
    const curso = AlunoModel.normalizarTexto(dados?.curso);
    const turma = AlunoModel.normalizarTexto(dados?.turma);

    if (
      ra === "" ||
      nome === "" ||
      email === "" ||
      curso === "" ||
      turma === ""
    ) {
      return {
        sucesso: false,
        status: 400,
        mensagem: "Todos os campos são obrigatórios."
      };
    }

    if (!AlunoModel.validarEmail(email)) {
      return {
        sucesso: false,
        status: 400,
        mensagem: "Informe um e-mail válido."
      };
    }

    if (AlunoModel.localizarPorRa(ra)) {
      return {
        sucesso: false,
        status: 409,
        mensagem: "Já existe um aluno com esse RA."
      };
    }

    const aluno = {
      id: AlunoModel.gerarProximoId(),
      ra,
      nome,
      email,
      curso,
      turma,
      ativo: true
    };

    alunos.push(aluno);

    return {
      sucesso: true,
      status: 201,
      aluno
    };
  },

  // Devolve uma cópia do array, para que quem chamar
  // não receba o array interno do Model.
  listar() {
    return [...alunos];
  }
};

export default AlunoModel;
