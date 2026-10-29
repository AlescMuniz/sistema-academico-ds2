// View: localiza elementos HTML, lê o formulário, observa o evento submit,
// apresenta mensagens, monta a tabela e apresenta o JSON.
// Não valida dados e não acessa o Model.

const AlunoView = {
  // Guarda as referências aos elementos HTML, evitando repetir getElementById.
  elementos: {},

  // Deve ser executado antes dos demais métodos.
  inicializar() {
    AlunoView.elementos.formulario = document.getElementById("form-aluno");
    AlunoView.elementos.ra = document.getElementById("ra");
    AlunoView.elementos.nome = document.getElementById("nome");
    AlunoView.elementos.email = document.getElementById("email");
    AlunoView.elementos.curso = document.getElementById("curso");
    AlunoView.elementos.turma = document.getElementById("turma");
    AlunoView.elementos.mensagem = document.getElementById("mensagem");
    AlunoView.elementos.corpoTabela = document.getElementById("corpo-tabela-alunos");
    AlunoView.elementos.totalAlunos = document.getElementById("total-alunos");
    AlunoView.elementos.saidaJson = document.getElementById("saida-json");
    AlunoView.elementos.botaoLimpar = document.getElementById("btn-limpar-dados");
  },

  // Registra a função do Controller que será executada no envio do formulário.
  configurarFormulario(aoEnviar) {
    AlunoView.elementos.formulario.addEventListener("submit", function (evento) {
      // Impede o comportamento padrão, que recarregaria a página.
      evento.preventDefault();

      const dados = AlunoView.lerDados();
      aoEnviar(dados);
    });
  },

  // Registra a função do Controller executada no clique do botão Limpar dados.
  configurarBotaoLimpar(aoLimpar) {
    AlunoView.elementos.botaoLimpar.addEventListener("click", function () {
      aoLimpar();
    });
  },

  // Apenas coleta os valores; normalização e validação pertencem ao Model.
  lerDados() {
    return {
      ra: AlunoView.elementos.ra.value,
      nome: AlunoView.elementos.nome.value,
      email: AlunoView.elementos.email.value,
      curso: AlunoView.elementos.curso.value,
      turma: AlunoView.elementos.turma.value
    };
  },

  // Pede confirmação ao usuário antes de remover os dados.
  confirmarLimpeza() {
    return confirm("Deseja remover todos os alunos cadastrados?");
  },

  exibirSucesso(mensagem) {
    AlunoView.elementos.mensagem.textContent = mensagem;
    AlunoView.elementos.mensagem.className = "mensagem sucesso";
  },

  exibirErro(mensagem) {
    AlunoView.elementos.mensagem.textContent = mensagem;
    AlunoView.elementos.mensagem.className = "mensagem erro";
  },

  // Limpa os campos e devolve o foco ao RA para o próximo cadastro.
  limparFormulario() {
    AlunoView.elementos.formulario.reset();
    AlunoView.elementos.ra.focus();
  },

  // Atualiza o contador e reconstrói as linhas da tabela.
  exibirLista(alunos) {
    const corpoTabela = AlunoView.elementos.corpoTabela;

    // Remove as linhas apresentadas anteriormente.
    corpoTabela.textContent = "";

    AlunoView.elementos.totalAlunos.textContent = `Total: ${alunos.length}`;

    if (alunos.length === 0) {
      const linha = document.createElement("tr");
      const celula = document.createElement("td");

      celula.colSpan = 7;
      celula.textContent = "Nenhum aluno foi cadastrado.";

      linha.appendChild(celula);
      corpoTabela.appendChild(linha);

      return;
    }

    alunos.forEach(function (aluno) {
      const linha = document.createElement("tr");

      // Mesma ordem das colunas do HTML.
      const valores = [
        aluno.id,
        aluno.ra,
        aluno.nome,
        aluno.email,
        aluno.curso,
        aluno.turma,
        aluno.ativo ? "Ativo" : "Inativo"
      ];

      valores.forEach(function (valor) {
        const celula = document.createElement("td");

        // textContent insere o valor como texto; innerHTML não é usado
        // com dados fornecidos pelo usuário.
        celula.textContent = valor;

        linha.appendChild(celula);
      });

      corpoTabela.appendChild(linha);
    });
  },

  // Apresenta o texto JSON dentro da tag pre.
  exibirJson(textoJson) {
    AlunoView.elementos.saidaJson.textContent = textoJson;
  }
};
