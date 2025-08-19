# Teste Técnico: API para Sistema de Gestão Acadêmica

## Introdução

Olá, candidato! Este desafio tem como objetivo avaliar suas habilidades na construção de uma API RESTful robusta, segura e bem documentada. Você deverá construir o back-end que servirá a uma aplicação de front-end.

O foco não está apenas em fazer a API funcionar, mas em como ela é projetada, testada e preparada para o ambiente de produção.

## Contexto: A Aplicação Front-end

A API que você construirá deve servir a uma aplicação com duas personas principais:

1.  **Professor (Admin):** Faz login, visualiza uma lista de *todos* os seus alunos, suas notas, médias e situação. Ele também poderá gerenciar os alunos e suas notas.
2.  **Aluno:** Faz login e visualiza *apenas* suas próprias notas, média e situação.

## Escopo Mínimo (MVP - O Essencial)

Primeiramente, você deve construir a base que atenda aos requisitos da aplicação.

1.  **Modelagem de Dados:**
    * Crie modelos para `Usuários` (com diferenciação de papel/role: `PROFESSOR`, `ALUNO`) e `Notas`.
    * Um usuário deve ter no mínimo: `id`, `firstName`, `lastName`, `email`, `password` (armazenado de forma segura com hash) e `role`.
    * As notas devem estar associadas a um aluno.

2.  **Autenticação:**
    * Crie um endpoint de `POST /login`.
    * Ele deve receber `email` e `password`, validar as credenciais e, em caso de sucesso, retornar um token JWT (JSON Web Token).
    * O payload do token deve conter informações essenciais como o `userId` e o `role` do usuário.

3.  **Endpoints Principais (Protegidos por Autenticação):**
    * **Para o Professor:**
        * `GET /admin/students`: Retorna uma lista de todos os alunos, incluindo o cálculo de `average` e `situation`. Apenas usuários com o papel `PROFESSOR` podem acessar.
    * **Para o Aluno:**
        * `GET /student/scores`: Retorna as notas, a média e a situação *apenas do aluno autenticado*, utilizando o `userId` do token JWT. Apenas usuários com o papel `ALUNO` podem acessar.

## Funcionalidades Adicionais (Diferenciais)

Esta é a parte que nos permitirá ver sua experiência em ação. Esperamos que você implemente várias das funcionalidades abaixo para demonstrar profundidade técnica.

### 1. Operações de Gerenciamento (CRUD Completo)
* **Requisito:** Permita que o professor gerencie seus alunos.
* **Endpoints a serem criados:**
    * `POST /admin/students`: Cria um novo aluno.
    * `PUT /admin/students/{studentId}`: Atualiza os dados e/ou as notas de um aluno. Os campos `average` e `situation` devem ser recalculados.
    * `DELETE /admin/students/{studentId}`: Remove um aluno do sistema.

### 2. API Design e Boas Práticas
* **Requisito:** A API deve ser robusta e fácil de usar.
* **Implementação:**
    * **Paginação:** O endpoint `GET /admin/students` deve ser paginado (ex: `?page=1&limit=20`).
    * **Filtros e Buscas:** Adicione a capacidade de filtrar e buscar alunos no mesmo endpoint (ex: `?situation=Aprovado` ou `?name=Fábio`).
    * **Validação de Entrada (Input Validation):** Utilize uma biblioteca (como Zod, Joi, etc.) para garantir que os dados de entrada (payloads de `POST` e `PUT`) estão corretos. Ex: notas devem ser números entre 0 e 10.

### 3. Arquitetura e Qualidade de Código
* **Requisito:** O código deve ser limpo, organizado e testável.
* **Implementação:**
    * Aplique princípios de design como **SOLID**.
    * Separe as responsabilidades em camadas (ex: Controllers, Services, Repositories).
    * **Testes Automatizados:** Crie testes unitários para a lógica de negócio (ex: cálculo da média) e testes de integração para os endpoints da API.

### 4. Performance e Tarefas Assíncronas
* **Requisito:** Lidar com operações que podem ser demoradas.
* **Implementação:**
    * Crie um endpoint `POST /admin/students/export` que inicie a geração de um relatório em CSV com os dados de todos os alunos.
    * Esta operação **não** deve bloquear a resposta. O endpoint deve retornar imediatamente um status `202 Accepted`. A geração do CSV deve ocorrer em background (pode ser simulada ou implementada com ferramentas como BullMQ, etc.).

## Tecnologias

* **Linguagem/Framework:** O back-end **deve** ser desenvolvido em **Node.js**. O candidato tem a liberdade de escolher o framework que preferir (Express, NestJS, Fastify, Koa, etc.), mas deve justificar a escolha no `README.md`.
* **Banco de Dados:** A escolha é livre (PostgreSQL, MySQL, MongoDB), mas deve ser configurada para rodar via Docker. O uso de um ORM (como Prisma, TypeORM, Sequelize) é recomendado.
* **Containerização:** O projeto final **obrigatoriamente** precisa ser entregue com `Dockerfile` e `docker-compose.yml` para que a aplicação e seu banco de dados possam ser iniciados com um único comando (`docker-compose up`).

## Entregáveis

1.  **Repositório no GitHub:** O código-fonte deve ser disponibilizado em um repositório público.
2.  **README.md detalhado:** Este é um dos itens mais importantes. O `README` deve conter:
    * O nome do candidato.
    * Justificativa das escolhas tecnológicas (framework, banco de dados, etc.).
    * Explicação da arquitetura do projeto.
    * Instruções claras para rodar o projeto localmente com Docker.
    * Instruções sobre como popular o banco de dados com dados iniciais (seed), se aplicável.
    * **Documentação da API:** É **obrigatório** documentar todos os endpoints. O formato é flexível (ex: um Postman Collection, um arquivo Swagger/OpenAPI, ou uma seção detalhada no próprio README descrevendo cada endpoint, seus parâmetros, payload e retornos esperados).

## Critérios de Avaliação

* **Funcionalidade:** O MVP e os pontos de complexidade escolhidos funcionam como esperado?
* **Qualidade do Código:** Clareza, organização, legibilidade e manutenibilidade.
* **Design de API:** Aderência aos princípios REST, uso correto de verbos HTTP e códigos de status.
* **Arquitetura:** Separação de responsabilidades e aplicação de padrões de design.
* **Modelagem do Banco de Dados:** Estrutura das tabelas/coleções e seus relacionamentos.
* **Testes:** Qualidade e cobertura dos testes automatizados.
* **Documentação:** Clareza e completude da documentação do projeto e da API.
* **DevOps:** Qualidade e funcionalidade dos arquivos Docker e do `docker-compose`.
