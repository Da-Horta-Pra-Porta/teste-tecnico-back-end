# Meu Desafio Backend: Da Horta Pra Porta

E aí! Esse aqui é o meu projeto pro desafio da Da Horta Pra Porta. É uma APIzinha que fiz pra cuidar dos produtores rurais e também tem umas estatísticas no dashboard.

---

## 🚀 Como fazer isso aqui rodar na sua máquina

Pra ver o projeto funcionando, você vai precisar de algumas coisas antes.

### O básico que você precisa ter:

* **Git**
* **Node.js e npm** (o que for mais recente já ajuda)
* **Docker Desktop** (esse é crucial! Tem que estar **aberto e rodando** no seu PC/Mac. Pensa nele como a "bateria" do banco de dados.)
* Um **Postman** ou **Insomnia** pra testar a API depois.

### Os passos pra botar pra funcionar:

1.  **Pegar o código:**
    Primeiro, clona o projeto (ou o seu fork) e entra na pasta:

    ```bash
    git clone [https://github.com/felipesergio353/teste-tecnico-back-end.git](https://github.com/felipesergio353/teste-tecnico-back-end.git)
    cd teste-tecnico-back-end
    ```

    Aí, instala tudo que precisa:

    ```bash
    npm install
    ```

2.  **Configurar o banco (o famoso `.env`):**
    A gente usa um arquivo `.env` pra API saber onde está o banco. Copia o exemplo pra criar o seu:

    ```bash
    cp .env.example .env
    ```
    Só confere se a linha `DATABASE_URL` no seu `.env` tá assim:
    `DATABASE_URL="postgresql://docker:docker@localhost:5432/dahorta?schema=public"`

3.  **Ligar o banco de dados (via Docker):**
    **Importantíssimo:** O **Docker Desktop tem que estar aberto e funcionando** (o ícone da baleia tem que estar paradinho lá em cima na sua barra de tarefas/menus). Se não estiver, a API não vai achar o banco.

    Depois disso, manda ver pra subir o PostgreSQL:

    ```bash
    docker compose up -d
    ```
    Se der zica aqui, quase certeza que o Docker Desktop não estava 100%. Dá uma olhada nele e tenta de novo.

4.  **Criar as tabelas no banco (com Prisma):**
    Com o banco de dados de pé, o Prisma precisa organizar as tabelas. Roda essa:

    ```bash
    npx prisma migrate dev --name initial-migration
    ```

5.  **Ligar a API:**
    Último passo! Acende a API:

    ```bash
    npm run dev
    ```
    Quando você vir `Server is running on port 3333` no terminal, pronto! A API tá no ar e esperando as chamadas.

---

## 🧪 Pra Testar na Prática (Postman/Insomnia)

Com a API ligada (passo 5), você pode usar o Postman/Insomnia pra mandar umas requisições.

* **Endereço Base:** `http://localhost:3333`

* **Pra criar um Produtor:**
    * **Método:** `POST`
    * **Rota:** `/producers`
    * **No Body (Corpo da requisição):** Manda um JSON com os dados do produtor. No Postman, escolhe `raw` e `JSON`. Ah, e o CPF/CNPJ tem que ser válido! Pega um num gerador online tipo 4Devs.

* **Pra ver a lista de Produtores:**
    * **Método:** `GET`
    * **Rota:** `/producers`

* **Pra ver as estatísticas (Dashboard):**
    * **Método:** `GET`
    * **Rota:** `/dashboard`

---

## 👨‍💻 Feito por

Felipe Sergio