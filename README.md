<p align="center">
  <img src="https://avatars.githubusercontent.com/u/54694125" width="100" alt="Foto de perfil da CPE Jr.">
</p>

<h1 align="center"><strong>Desafio Backend 💻</strong></h1>

<p align="center">
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#primeiros-passos">Primeiros Passos</a> • 
 <a href="#endpoints">Endpoints</a> •
 <a href="#logica-de-funcionamento">Lógica de Funcionamento</a> •
 <a href="#frontend">Frontend</a>
</p>

<p align="center">
    <b>API desenvolvida como parte de um desafio de trainee proposto pela <a href="https://github.com/cpejr" target="_blank">CPE Jr.</a></b>
</p>

---

<h2 id="tecnologias">💻 Tecnologias</h2>

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt (hash de senhas)
- dotenv (variáveis de ambiente)
- zod + zod-express-middleware (validação)

---

<h2 id="primeiros-passos">🚀 Primeiros Passos</h2>

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- Uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Clonando o repositório

```bash
git clone https://github.com/alexbeldam/backend-ponto.git
```

<h3>Configurando variáveis de ambiente</h3>

Crie um arquivo `.env` na raiz do projeto com base no seguinte formato:

```env
MONGO_URI=mongodb+srv://seu-usuario:senha@cluster.mongodb.net/seubanco
PORT=8000
JWT_SECRET=sua-chave-secreta
JWT_MAX_AGE=1d
```

<h3>Iniciando a aplicação</h3>

```bash
cd backend-ponto
npm install
npm start
```

<h2 id="endpoints">📍 Endpoints da API</h2>

| Rota                        | Descrição
|-----------------------------|-------------------------------------------------------------
| <kbd>POST /login</kbd>            | Autentica um usuário e retorna um token JWT
| <kbd>POST /usuarios</kbd>         | Cria um novo usuário
| <kbd>POST /sessoes</kbd>          | Registra o ponto de entrada do usuário
| <kbd>GET /usuarios</kbd>          | Retorna a lista de usuários
| <kbd>GET /sessoes</kbd>           | Retorna a lista de sessões registradas
| <kbd>PUT /usuarios/:id</kbd>      | Atualiza um usuário específico
| <kbd>DELETE /usuarios/:id</kbd>   | Remove um usuário específico
| <kbd>DELETE /sessoes/:id_usuario</kbd> | Encerra a sessão ativa do usuário (logout)

<h2 id="logica-de-funcionamento">🧠 Lógica de Funcionamento</h2>

- Cada usuário pode ter apenas uma sessão ativa por vez  
- Criar uma sessão (`POST /sessoes`) equivale a bater o ponto (entrada)  
- Deletar a sessão (`DELETE /sessoes/:id_usuario`) equivale a encerrar o ponto (saída) — chamado de logout pela CPE  
- As senhas são criptografadas com bcrypt  
- Todas as entradas são validadas com Zod para garantir a integridade dos dados  

<h3>Exemplo de login</h3>

<h3 id="login">POST /login</h3>

**REQUEST**
```json
{
  "email": "usuario@email.com",
  "senha": "123456"
}
```

**RESPONSE**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

<h3>Autenticação</h3>
As rotas protegidas requerem o token JWT no cabeçalho:


```http
Authorization: Bearer <token>
```

<h2 id="frontend">🖥️ Frontend</h2>

O frontend que consome esta API pode ser encontrado neste repositório:  
👉 **[https://github.com/alexbeldam/frontend-ponto](https://github.com/alexbeldam/frontend-ponto)**

---

<p align="center">
  Feito com 💛 durante o processo seletivo da <a href="https://github.com/cpejr" target="_blank">CPE Jr.</a>

</p>
