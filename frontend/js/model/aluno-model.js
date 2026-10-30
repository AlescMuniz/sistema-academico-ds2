// Model do frontend: normaliza e valida os dados que serão enviados à API.
// A validação melhora a experiência do usuário, mas não substitui
// a validação oficial feita pelo backend.

const AlunoModel = {
  // Converte o valor para texto e remove espaços no começo e no final.
  normalizarTexto(valor) {
    if (valor === null || valor === undefined) {
      return "";
    }

    return String(valor).trim();
  },

  // Validação inicial do e-mail.
  validarEmail(email) {
    return email.includes("@") && email.includes(".");
  },

  // Normaliza e valida os dados informados no formulário.
  validar(dados) {
    const aluno = {
      ra: AlunoModel.normalizarTexto(dados.ra),
      nome: AlunoModel.normalizarTexto(dados.nome),

      // O e-mail também é convertido para letras minúsculas.
      email: AlunoModel
        .normalizarTexto(dados.email)
        .toLowerCase(),

      curso: AlunoModel.normalizarTexto(dados.curso),
      turma: AlunoModel.normalizarTexto(dados.turma)
    };

    if (
      aluno.ra === "" ||
      aluno.nome === "" ||
      aluno.email === "" ||
      aluno.curso === "" ||
      aluno.turma === ""
    ) {
      return {
        sucesso: false,
        mensagem: "Todos os campos são obrigatórios."
      };
    }

    if (!AlunoModel.validarEmail(aluno.email)) {
      return {
        sucesso: false,
        mensagem: "Informe um e-mail válido."
      };
    }

    // Dados válidos: devolve o objeto preparado para ser enviado à API.
    return {
      sucesso: true,
      dados: aluno
    };
  }
};
