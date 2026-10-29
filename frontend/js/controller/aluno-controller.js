// Controller: inicia a aplicação e coordena View e Service.
// Não acessa diretamente o array, o localStorage nem o Model.

const AlunoController = {
  iniciar() {
    AlunoView.inicializar();

    AlunoView.configurarFormulario(function (dados) {
      AlunoController.cadastrar(dados);
    });

    AlunoView.configurarBotaoLimpar(function () {
      AlunoController.limparDados();
    });

    // Carrega e apresenta os dados já armazenados:
    // os alunos voltam para a tabela depois que a página é atualizada.
    AlunoController.atualizarVisualizacao();
  },

  cadastrar(dados) {
    const resultado = AlunoService.cadastrar(dados);

    if (!resultado.sucesso) {
      AlunoView.exibirErro(resultado.mensagem);
      return;
    }

    AlunoView.exibirSucesso(
      `Aluno ${resultado.aluno.nome} cadastrado com sucesso.`
    );
    AlunoView.limparFormulario();
    AlunoController.atualizarVisualizacao();
  },

  // Coordena a remoção de todos os dados.
  limparDados() {
    const alunos = AlunoService.listar();

    // Evita pedir confirmação quando a lista já está vazia.
    if (alunos.length === 0) {
      AlunoView.exibirErro("Não existem alunos para remover.");
      return;
    }

    const confirmou = AlunoView.confirmarLimpeza();

    if (!confirmou) {
      return;
    }

    AlunoService.limpar();

    AlunoView.exibirSucesso("Todos os alunos foram removidos.");

    AlunoController.atualizarVisualizacao();
  },

  // Recupera os dados e atualiza a interface.
  atualizarVisualizacao() {
    const alunos = AlunoService.listar();
    AlunoView.exibirLista(alunos);

    const textoJson = JSON.stringify(alunos, null, 2);
    AlunoView.exibirJson(textoJson);
  }
};

AlunoController.iniciar();
