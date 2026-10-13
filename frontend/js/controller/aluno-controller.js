// Controller: coordena a comunicação entre a View e o Model.
// Não valida dados e não interage diretamente com o usuário.

const AlunoController = {
  // Executa o fluxo de cadastro, listagem e conversão para JSON.
  iniciar() {
    let continuar = true;

    // Repete o cadastro enquanto o usuário quiser continuar.
    while (continuar) {
      const dados = AlunoView.lerDados();
      const resultado = AlunoModel.cadastrar(dados);

      if (resultado.sucesso) {
        AlunoView.exibirAluno(resultado.aluno);
      } else {
        AlunoView.exibirErro(resultado.mensagem);
      }

      continuar = AlunoView.perguntarNovoCadastro();
    }

    // Obtém e exibe os alunos cadastrados.
    const alunos = AlunoModel.listar();
    AlunoView.exibirLista(alunos);

    // Converte o array de alunos para texto JSON.
    const textoJson = JSON.stringify(alunos, null, 2);
    AlunoView.exibirJson(textoJson);

    // Reconstrói o array a partir do texto JSON.
    const dadosRecuperados = JSON.parse(textoJson);
    AlunoView.exibirDadosRecuperados(dadosRecuperados);
  }
};

AlunoController.iniciar();
