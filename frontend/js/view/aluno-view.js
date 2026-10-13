// View: responsável pela interação com o usuário e pela exibição dos resultados.
// Não valida dados e não acessa o Model.

const AlunoView = {
  // Solicita os dados do aluno e retorna um objeto com os valores digitados.
  lerDados() {
    return {
      ra: prompt("Digite o RA do aluno:"),
      nome: prompt("Digite o nome do aluno:"),
      email: prompt("Digite o e-mail do aluno:"),
      curso: prompt("Digite o curso:"),
      turma: prompt("Digite a turma:")
    };
  },

  // Exibe a mensagem de sucesso e os dados do aluno cadastrado.
  exibirAluno(aluno) {
    console.log("Aluno cadastrado com sucesso.");
    console.table(aluno);
  },

  // Exibe a mensagem de erro recebida.
  exibirErro(mensagem) {
    console.error("Erro:", mensagem);
  },

  // Pergunta se o usuário deseja continuar. Retorna true ou false.
  perguntarNovoCadastro() {
    return confirm("Deseja cadastrar outro aluno?");
  },

  // Exibe a quantidade e a lista de alunos cadastrados.
  exibirLista(alunos) {
    console.log("Quantidade de alunos cadastrados:", alunos.length);

    if (alunos.length === 0) {
      console.log("Nenhum aluno foi cadastrado.");
      return;
    }

    console.table(alunos);
  },

  // Exibe os alunos convertidos para texto JSON.
  exibirJson(textoJson) {
    console.log("Alunos em formato JSON:");
    console.log(textoJson);
  },

  // Exibe os dados reconstruídos a partir do texto JSON.
  exibirDadosRecuperados(dados) {
    console.log("Dados reconstruídos com JSON.parse():");
    console.table(dados);
  }
};
