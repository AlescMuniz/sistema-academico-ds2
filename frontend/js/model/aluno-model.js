// Model: responsável pelos dados dos alunos e pelas regras de cadastro.
// Não interage com o usuário (sem prompt, confirm, console.log ou DOM).

const AlunoModel = {
  // Array em memória onde os alunos ficam armazenados.
  alunos: [],

  // Converte o valor em texto e remove espaços do início e do fim.
  // null e undefined viram string vazia.
  normalizarTexto(valor) {
    if (valor === null || valor === undefined) {
      return "";
    }
    return String(valor).trim();
  },

  // Validação didática: o e-mail precisa conter "@" e ".".
  validarEmail(email) {
    return email.includes("@") && email.includes(".");
  },

  // Procura um aluno pelo RA. Retorna o aluno encontrado ou undefined.
  localizarPorRa(ra) {
    return AlunoModel.alunos.find(function (aluno) {
      return aluno.ra === ra;
    });
  },

  // Normaliza, valida e cadastra um novo aluno.
  // Retorna { sucesso: true, aluno } ou { sucesso: false, mensagem }.
  cadastrar(dados) {
    const ra = AlunoModel.normalizarTexto(dados.ra);
    const nome = AlunoModel.normalizarTexto(dados.nome);
    const email = AlunoModel.normalizarTexto(dados.email);
    const curso = AlunoModel.normalizarTexto(dados.curso);
    const turma = AlunoModel.normalizarTexto(dados.turma);

    if (!ra || !nome || !email || !curso || !turma) {
      return { sucesso: false, mensagem: "Todos os campos são obrigatórios." };
    }

    if (!AlunoModel.validarEmail(email)) {
      return { sucesso: false, mensagem: "Informe um e-mail válido." };
    }

    if (AlunoModel.localizarPorRa(ra)) {
      return { sucesso: false, mensagem: "Já existe um aluno com esse RA." };
    }

    const aluno = {
      id: AlunoModel.alunos.length + 1,
      ra: ra,
      nome: nome,
      email: email,
      curso: curso,
      turma: turma,
      ativo: true
    };

    AlunoModel.alunos.push(aluno);

    return { sucesso: true, aluno: aluno };
  },

  // Retorna uma cópia superficial do array.
  // Os objetos dos alunos continuam compartilhados.
  listar() {
    return [...AlunoModel.alunos];
  }
};
