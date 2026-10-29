// Service: coordena o Model e a persistência dos dados.
// Nesta versão a persistência usa localStorage; em uma versão futura
// este arquivo usará fetch() para se comunicar com a API.

const AlunoService = {
  // Chave específica para evitar conflito com dados de outras aplicações.
  CHAVE_STORAGE: "sistema-academico-ds2:alunos",

  // Recupera os alunos armazenados.
  listar() {
    // Se a chave não existir, getItem() devolve null.
    const textoJson = localStorage.getItem(
      AlunoService.CHAVE_STORAGE
    );

    if (textoJson === null) {
      return [];
    }

    // JSON.parse() gera erro quando recebe um JSON inválido.
    try {
      const dados = JSON.parse(textoJson);

      // Confirma se o resultado é realmente um array.
      if (!Array.isArray(dados)) {
        return [];
      }

      return dados;
    } catch (erro) {
      // Se o conteúdo estiver corrompido, remove o valor inválido.
      localStorage.removeItem(
        AlunoService.CHAVE_STORAGE
      );

      return [];
    }
  },

  // Converte o array para JSON e salva no navegador.
  salvar(alunos) {
    const textoJson = JSON.stringify(alunos);

    localStorage.setItem(
      AlunoService.CHAVE_STORAGE,
      textoJson
    );
  },

  // Recupera a lista, pede ao Model a validação e a criação,
  // adiciona o aluno ao array e salva.
  cadastrar(dados) {
    const alunos = AlunoService.listar();

    const resultado = AlunoModel.criar(
      dados,
      alunos
    );

    // Se o Model identificar um problema, devolve o resultado ao Controller.
    if (!resultado.sucesso) {
      return resultado;
    }

    alunos.push(resultado.aluno);

    AlunoService.salvar(alunos);

    return resultado;
  },

  // Remove toda a lista armazenada.
  limpar() {
    localStorage.removeItem(
      AlunoService.CHAVE_STORAGE
    );
  }
};
