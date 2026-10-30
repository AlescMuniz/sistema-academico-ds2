# Sistema Acadêmico DS II

Projeto desenvolvido para a disciplina de Desenvolvimento para Servidores II, do curso de Sistemas para Internet da Fatec São Roque.

## Aluno

- **Nome:** Alex Muniz
- **RA:** 2650832423032
- **Turma:** Sistemas para Internet, 5º semestre

## Objetivo

Desenvolver gradualmente um sistema acadêmico web que permita cadastrar e consultar alunos, disciplinas, usuários e notas.

O projeto é desenvolvido por etapas, começando com JavaScript e evoluindo para uma aplicação com frontend e backend.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Insomnia
- Git e GitHub

## Estrutura do projeto

- **frontend:** interface do sistema, desenvolvida com HTML, CSS e JavaScript.
- **backend:** API desenvolvida com Node.js e Express.
- **database:** reservada para arquivos e scripts do banco de dados (ainda não utilizada).
- **docs:** documentação e registros do desenvolvimento.
  - **docs/evidencias:** capturas de tela dos testes.

## Etapas de desenvolvimento

- **Versão 0.1:** cadastro de alunos utilizando JavaScript, MVC e JSON.
- **Versão 0.2:** criação da interface com HTML, CSS e DOM.
- **Versão 0.3:** armazenamento local dos dados com localStorage.
- **Versão 1.0:** criação do servidor e da primeira API com Node.js.
- **Versão 1.1:** integração do frontend com a API utilizando fetch().
- **Versão 1.2:** migração do backend para o framework Express.

## Como executar o backend

Com o Node.js instalado, abra um terminal na raiz do projeto e execute:

```bash
cd backend
npm install
npm run dev
```

O servidor ficará disponível em `http://localhost:3000`.

## Como executar o frontend

1. Mantenha o backend em execução.
2. No VS Code, clique com o botão direito em `frontend/index.html` e escolha **Open with Live Server**.
3. A página abrirá em `http://127.0.0.1:5500/frontend/index.html`.

## Endpoints da API

| Método | Endpoint | Finalidade | Status esperado |
| --- | --- | --- | --- |
| GET | `/api/health` | Verificar se o servidor está funcionando | 200 OK |
| GET | `/api/alunos` | Listar os alunos cadastrados | 200 OK |
| POST | `/api/alunos` | Cadastrar um aluno | 201 Created |

No cadastro, a API também pode responder `400 Bad Request` (dados inválidos) e `409 Conflict` (RA já cadastrado).

Exemplo de corpo para `POST /api/alunos`:

```json
{
  "ra": "2026001",
  "nome": "Marcos Costa",
  "email": "marcos.costa@email.com",
  "curso": "SI",
  "turma": "2º semestre"
}
```

## Evidências

As capturas de tela dos testes estão na pasta [`docs/evidencias`](docs/evidencias):

- `01-frontend.png`: formulário, tabela e aluno cadastrado.
- `02-servidor.png`: backend em execução com `npm run dev`.
- `03-cadastro-insomnia.png`: cadastro de aluno com status 201 Created.
- `04-listagem-insomnia.png`: listagem de alunos com status 200 OK.

## Situação atual

O projeto está na versão 1.2. O frontend se comunica com o backend por meio de `fetch()`, e o backend utiliza Node.js e Express.

Os alunos ficam armazenados em memória no servidor e são perdidos quando ele é reiniciado. Nesta fase não há banco de dados.
