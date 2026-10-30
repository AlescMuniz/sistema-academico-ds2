// Inicializa o servidor usando a aplicação Express configurada no app.js.
import app from "./app.js";

// Porta do ambiente (deploy) ou 3000 no desenvolvimento local.
const PORTA = Number(process.env.PORT) || 3000;

// Permite conexões externas; também será útil no deploy no Render.
const HOST = "0.0.0.0";

// Inicia a aplicação Express.
app.listen(PORTA, HOST, () => {
  console.log(
    `Servidor Express disponível em ` +
    `http://localhost:${PORTA}`
  );
});
