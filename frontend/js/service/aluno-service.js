// Service: comunicação entre o frontend e a API.
// O Controller não precisa conhecer fetch(), cabeçalhos ou conversão de JSON.

const AlunoService = {
  // Endereço base dos endpoints de alunos.
  URL_API: "http://localhost:3000/api/alunos",

  // Converte a resposta da API em objeto e trata respostas de erro.
  async processarResposta(resposta) {
    let resultado;

    try {
      resultado = await resposta.json();
    } catch (erro) {
      // O servidor não devolveu um JSON válido.
      throw new Error(
        "O servidor retornou uma resposta inválida."
      );
    }

    // resposta.ok é verdadeira para status entre 200 e 299.
    if (!resposta.ok) {
      // Usa a mensagem da API; se não existir, uma mensagem genérica.
      throw new Error(
        resultado.mensagem ||
        "Não foi possível concluir a operação."
      );
    }

    return resultado;
  },

  // Executa a requisição e trata problemas de conexão com o backend.
  async requisitar(opcoes = {}) {
    let resposta;

    try {
      // O segundo argumento do fetch() contém método, cabeçalhos e corpo.
      resposta = await fetch(
        AlunoService.URL_API,
        opcoes
      );
    } catch (erro) {
      // Servidor desligado, endereço incorreto, rede ou bloqueio de CORS.
      throw new Error(
        "Não foi possível conectar ao servidor."
      );
    }

    return AlunoService.processarResposta(resposta);
  },

  // Solicita a lista de alunos.
  // GET é o método padrão do fetch(); foi mantido para deixar explícito.
  async listar() {
    const resultado = await AlunoService.requisitar({
      method: "GET",

      // Informa que o cliente espera receber JSON.
      headers: {
        "Accept": "application/json"
      }
    });

    // A API retorna { total, dados }; o Service devolve somente o array.
    return resultado.dados;
  },

  // Envia os dados de um novo aluno para a API.
  async cadastrar(aluno) {
    return AlunoService.requisitar({
      method: "POST",

      headers: {
        "Accept": "application/json",

        // Informa que o corpo da requisição está em JSON.
        "Content-Type": "application/json"
      },

      // Converte o objeto para texto JSON.
      body: JSON.stringify(aluno)
    });
  }
};
