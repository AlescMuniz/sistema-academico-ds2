// Controller: inicia a aplicação, conecta o formulário ao cadastro,
// envia os dados ao Model, analisa o resultado e pede a atualização da View.
// Não valida dados e não acessa o DOM diretamente.

const AlunoController = {
  iniciar() {
    // A View localiza os elementos HTML.
    AlunoView.inicializar();

    // Entrega à View a função que será executada no envio do formulário.
    AlunoView.configurarFormulario(function (dados) {
      AlunoController.cadastrar(dados);
    });

    // Estado inicial: sem alunos, a tabela mostra "Nenhum aluno foi cadastrado".
    AlunoController.atualizarVisualizacao();
  },

  cadastrar(dados) {
    const resultado = AlunoModel.cadastrar(dados);

    // Se o Model encontrar algum problema, exibe o erro e encerra.
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

  // Atualiza a tabela e o JSON com a lista atual de alunos.
  atualizarVisualizacao() {
    const alunos = AlunoModel.listar();
    AlunoView.exibirLista(alunos);

    const textoJson = JSON.stringify(alunos, null, 2);
    AlunoView.exibirJson(textoJson);
  }
};

// Inicia a aplicação depois que os scripts forem carregados.
AlunoController.iniciar();
