# Desafio Backend - Sistema de Notas

E aí! Esse aqui é o meu projeto para o desafio de backend. Criei uma API em Node.js para um sistema de gerenciamento de notas, com perfis para professores e alunos.

---

## 🚀 Stack e escolhas

* **Node.js com Express e TypeScript:** Escolhi essa combinação porque o Express é super leve e flexível, o que me deu total controle sobre a estrutura. O TypeScript entra pra garantir um código mais seguro e fácil de manter.
* **Prisma ORM com PostgreSQL:** Prisma é incrível para trabalhar com TypeScript, a integração é muito boa e o schema é fácil de entender. O PostgreSQL é um banco de dados robusto que eu já conhecia.
* **Docker:** Usei Docker pra containerizar o banco de dados. Assim, qualquer pessoa que clonar o projeto só precisa ter o Docker rodando pra que o banco suba sem dor de cabeça.
* **JWT e bcryptjs:** Para a parte de segurança, usei JWT para autenticação baseada em token (depois do login) e bcryptjs pra nunca salvar senhas em texto puro no banco.
* **Zod:** Pra validar os dados que chegam na API. É bem simples e se integra super bem com o TypeScript.

---

## 🏗️ Como o projeto tá organizado

A estrutura do código foi pensada pra ser fácil de entender e dar manutenção. A lógica principal fica em `src/modules/`, separada por responsabilidade:

* **`controllers/`**: Lidam com as requisições e respostas HTTP.
* **`services/`**: Onde mora a lógica de negócio (cálculos, chamadas pro banco, etc.).
* **`routes/`**: Define os endpoints da API (ex: `/login`, `/admin/students`).
* **`middlewares/`**: Funções que rodam no meio da requisição, como a que verifica se o usuário tá logado.

---

## 🛠️ Como Rodar o Projeto

Pra fazer a API funcionar, você vai precisar de algumas coisinhas instaladas.

### O que você precisa ter na máquina:

* **Git**
* **Node.js e npm**
* **Docker Desktop** (esse é o mais importante! Tem que estar **aberto e rodando**).

### Passos pra subir a API:

1.  **Pega o código e instala as dependências:**
    ```bash
    git clone [https://github.com/felipesergio353/teste-tecnico-back-end.git](https://github.com/felipesergio353/teste-tecnico-back-end.git)
    cd teste-tecnico-back-end
    npm install
    ```

2.  **Configura o `.env`:**
    A API precisa saber onde o banco de dados está. É só copiar o arquivo de exemplo:
    ```bash
    cp .env.example .env
    ```

3.  **Sobe o banco com Docker:**
    **Garante que o Docker Desktop tá aberto e funcionando!**
    ```bash
    docker compose up -d
    ```

4.  **Prepara o banco de dados:**
    Esse comando cria as tabelas e já coloca um professor e um aluno lá dentro pra gente poder testar:
    ```bash
    npx prisma migrate dev --name init-school-schema
    npx prisma db seed
    ```
    As credenciais de teste são:
    * **Professor:** `professor@escola.com` | `senha.professor`
    * **Aluno:** `aluno@escola.com` | `senha.aluno`

5.  **Roda a API:**
    Agora é só ligar o servidor!
    ```bash
    npm run dev
    ```
    Se aparecer `Server is running on port 3333`, deu tudo certo! A API tá no ar.

---

## 🧪 Testando a API (com Postman ou Insomnia)

A forma mais fácil de testar é importar o arquivo **`api_docs.postman_collection.json`** no seu Postman. Lá tem todas as requisições prontas.

Mas se quiser fazer na mão, aqui vai um guia rápido:

#### 1. Fazer Login

Primeiro, você precisa de um token. Manda um `POST` pra `/login` com as credenciais do professor ou do aluno.

* `POST http://localhost:3333/login`
    ```json
    {
        "email": "professor@escola.com",
        "password": "senha.professor"
    }
    ```
    A resposta vai te dar um `token`. **Copia ele!** Você vai precisar dele pra todas as outras requisições.

#### 2. Rotas do Professor (usar o token de professor)

* **Ver todos os alunos:**
    * `GET http://localhost:3333/admin/students`
    * **Dica:** Tente usar filtros na URL! Ex: `?name=Fulano` ou `?situation=Aprovado&limit=5`.

* **Criar um novo aluno:**
    * `POST http://localhost:3333/admin/students`
    * No **Body**, manda um JSON com os dados do novo aluno.

* `PUT /admin/students/:id` e `DELETE /admin/students/:id` também estão disponíveis pra atualizar e deletar.

#### 3. Rotas do Aluno (usar o token de aluno)

* **Ver minhas notas:**
    * `GET http://localhost:3333/student/scores`

Para todas as rotas (exceto `/login`), lembre-se de ir na aba **Authorization**, escolher **Bearer Token** e colar o token que você copiou.

---

## 👨‍💻 Feito por

Felipe Sergio