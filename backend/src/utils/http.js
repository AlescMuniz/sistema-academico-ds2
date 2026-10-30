// Funções auxiliares para requisições e respostas HTTP.

// Cabeçalhos CORS: permitem que um frontend em outra origem
// (ex.: http://127.0.0.1:5500) faça requisições para o backend.
const cabecalhosCors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

// Envia uma resposta JSON.
// res: resposta HTTP; status: código (200, 201, 400, 404, 500...);
// dados: objeto ou array convertido para JSON.
export function enviarJson(res, status, dados) {
  // null = sem função de substituição; 2 = indentação legível.
  const textoJson = JSON.stringify(dados, null, 2);

  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    ...cabecalhosCors
  });

  res.end(textoJson);
}

// Envia uma resposta sem conteúdo (204).
// Usada nas requisições OPTIONS que o navegador faz por causa do CORS.
export function enviarSemConteudo(res) {
  res.writeHead(204, cabecalhosCors);
  res.end();
}

// Lê o corpo da requisição e converte o JSON recebido em objeto.
// É assíncrona porque o corpo pode chegar em várias partes.
export function lerCorpoJson(req) {
  return new Promise((resolve, reject) => {
    let corpo = "";

    // "data": executado a cada nova parte recebida.
    req.on("data", parte => {
      corpo += parte;
    });

    // "end": todo o corpo foi recebido.
    req.on("end", () => {
      // Corpo vazio é tratado como objeto vazio.
      if (corpo.trim() === "") {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(corpo));
      } catch (erro) {
        // JSON incorreto: a Promise é rejeitada.
        reject(erro);
      }
    });

    req.on("error", erro => {
      reject(erro);
    });
  });
}
