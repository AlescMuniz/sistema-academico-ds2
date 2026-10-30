// Controller: coordena Model, View e Service.

const AlunoController = {
  // Inicializa a aplicação.
  // É assíncrona porque, ao abrir a página, consulta os alunos no backend.
  async iniciar() {
    // Localiza os elementos HTML.
    AlunoView.iniciar();

    // Configura o evento de envio do formulário.
    AlunoView.configurarFormulario(
      AlunoController.cadastrar
    );

    // Informa que os dados estão sendo carregados.
    AlunoView.exibirMensagem(
      "Carregando alunos...",
      "informacao"
    );

    try {
      // Consulta os alunos existentes no servidor.
      await AlunoController.atualizarVisualizacao();

      AlunoView.exibirMensagem(
        "Dados carregados com sucesso.",
        "sucesso"
      );
    } catch (erro) {
      AlunoView.exibirMensagem(
        erro.message,
        "erro"
      );
    }
  },

  // Executa o cadastro do aluno.
  async cadastrar(evento) {
    // Evita o recarregamento da página.
    evento.preventDefault();

    // Solicita à View os valores do formulário.
    const dadosInformados = AlunoView.lerDados();

    // Encaminha os dados para a validação inicial.
    const validacao = AlunoModel.validar(
      dadosInformados
    );

    // Interrompe o processo se a validação do frontend encontrar um problema.
    if (!validacao.sucesso) {
      AlunoView.exibirMensagem(
        validacao.mensagem,
        "erro"
      );

      return;
    }

    // Desabilita temporariamente o botão.
    AlunoView.alterarEstadoFormulario(true);

    AlunoView.exibirMensagem(
      "Enviando dados para o servidor...",
      "informacao"
    );

    try {
      // Envia o aluno para o backend.
      const resultado =
        await AlunoService.cadastrar(
          validacao.dados
        );

      // Consulta novamente a lista do servidor.
      await AlunoController.atualizarVisualizacao();

      // Limpa o formulário depois do sucesso.
      AlunoView.limparFormulario();

      // Apresenta a mensagem devolvida pela API.
      AlunoView.exibirMensagem(
        resultado.mensagem,
        "sucesso"
      );
    } catch (erro) {
      // Erros de validação da API, RA duplicado ou falha de conexão.
      AlunoView.exibirMensagem(
        erro.message,
        "erro"
      );
    } finally {
      // Executado sempre, com sucesso ou erro.
      AlunoView.alterarEstadoFormulario(false);
    }
  },

  // Consulta os alunos na API e atualiza a View.
  async atualizarVisualizacao() {
    // Aguarda o Service consultar o backend.
    const alunos = await AlunoService.listar();

    // Atualiza a tabela.
    AlunoView.exibirLista(alunos);

    // Atualiza a apresentação em JSON.
    AlunoView.exibirJson(alunos);
  }
};

// Inicia a aplicação.
AlunoController.iniciar();
