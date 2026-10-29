// Model: contém as regras relacionadas ao aluno.
// Não sabe de onde os dados vieram, como serão apresentados
// nem onde serão armazenados.

const AlunoModel = {
  // Converte o valor para texto e remove espaços no começo e no final.
  normalizarTexto(valor) {
    if (valor === null || valor === undefined) {
      return "";
    }

    return String(valor).trim();
  },

  // Validação introdutória do e-mail.
  validarEmail(email) {
    return email.includes("@") && email.includes(".");
  },

  // Procura um aluno pelo RA na lista recebida (entregue pelo Service).
  localizarPorRa(alunos, ra) {
    return alunos.find(
      aluno => aluno.ra === ra
    );
  },

  // Calcula o próximo identificador. Sem alunos, o primeiro ID é 1.
  gerarProximoId(alunos) {
    if (alunos.length === 0) {
      return 1;
    }

    // map() cria um array contendo somente os IDs.
    const ids = alunos.map(
      aluno => aluno.id
    );

    // O spread (...) entrega cada ID como argumento de Math.max().
    const maiorId = Math.max(...ids);

    return maiorId + 1;
  },

  // Valida os dados e cria um novo objeto aluno.
  // Não salva o objeto: apenas o devolve para o Service.
  criar(dados, alunos) {
    const ra = AlunoModel.normalizarTexto(dados.ra);
    const nome = AlunoModel.normalizarTexto(dados.nome);
    const email = AlunoModel.normalizarTexto(dados.email);
    const curso = AlunoModel.normalizarTexto(dados.curso);
    const turma = AlunoModel.normalizarTexto(dados.turma);

    if (
      ra === "" ||
      nome === "" ||
      email === "" ||
      curso === "" ||
      turma === ""
    ) {
      return {
        sucesso: false,
        mensagem: "Todos os campos são obrigatórios."
      };
    }

    if (!AlunoModel.validarEmail(email)) {
      return {
        sucesso: false,
        mensagem: "Informe um e-mail válido."
      };
    }

    if (AlunoModel.localizarPorRa(alunos, ra)) {
      return {
        sucesso: false,
        mensagem: "Já existe um aluno com esse RA."
      };
    }

    const aluno = {
      id: AlunoModel.gerarProximoId(alunos),
      ra: ra,
      nome: nome,
      email: email,
      curso: curso,
      turma: turma,
      ativo: true
    };

    return {
      sucesso: true,
      aluno: aluno
    };
  }
};
