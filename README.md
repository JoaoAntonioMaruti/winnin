# Winnin Tech Challenge

Este projeto é um [desafio técnico](https://github.com/winnin/desafio/blob/master/BACKEND.md) que implementa uma API utilizando várias tecnologia modernas como NodeJs, GraphQL, PostgreSQL e processamento assíncrono.

## Como Subir o Projeto

Clone o repositório:

```bash
git clone https://github.com/JoaoAntonioMaruti/winnin.git
cd winnin
```

## Instale as dependências:

```bash
npm install
# ou
yarn
```
## Configure o arquivo .env:

Crie um arquivo .env com base no .env.example e ajuste as variáveis de ambiente de acordo com suas configurações locais.

 - `DATABASE_CONNECTION_URL`: url de conexão com o banco de dados
 - `APP_PORT`: porta que deseja usar para subir o servidor http, por padrão é usada a `4000`
 - `CRON_SCHEDULE_CONFIG`: Configuração para rodar programados, por padrão é: `0 0 * * *`
    - 0: minuto 0
    - 0: hora 0 (meia-noite)
    - *: qualquer dia do mês
    - *: qualquer mês
    - *: qualquer dia da semana

### Crie o banco de dados

```bash
npm run db:create
```

### Execute as migrações para configurar o banco de dados:

```bash
npm run db:migrate
```

### Para rodar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

### Execute os testes para verificar a integridade do sistema:

```bash
npm run test
```

## Tech Stack

- **[Node.js](https://nodejs.org/)**: Ambiente de execução para JavaScript no backend.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
- **[GraphQL](https://graphql.org/)**: Linguagem de consulta para APIs que permite buscar dados de forma eficiente.
- **[PostgreSQL](https://www.postgresql.org//)**: Banco de dados relacional.
- **[Knex.js](https://knexjs.org/)**: Query builder para bancos de dados relacionais, utilizado aqui com PostgreSQL.
- **[pg-boss](https://github.com/timgit/pg-boss)**: Gerenciamento de filas de jobs usando PostgreSQL.
- **[Jest](https://jestjs.io/)**: Framework de testes para assegurar a qualidade do código.
- **[Docker](https://www.docker.com/)**: Containerização para facilitar o gerenciamento do ambiente.
- **[ESLint](https://eslint.org/)**: Ferramenta de linting para manter a qualidade do código.
- **[Prettier](https://prettier.io/)**: Ferramenta para formatação automática de código.

## Software Architecture

O projeto segue uma Clean Architecture, garantindo uma separação clara de responsabilidades e fácil manutenção:

 - **Apresentação (GraphQL API)**: Interface de interação com o cliente por meio de queries e mutations.
 - **Aplicação (Use Cases)**: Lógica de negócios central, como gerenciamento de filas e tarefas.
 - **Domínio**: Define as regras de negócio e entidades principais.
 - **Infraestrutura**: Comunicação com o banco de dados (via Knex.js) e gerenciamento de filas (com pg-boss).

## Design Patterns

 - [x] **CQRS (Command Query Responsibility Segregation)**: Separa comandos [(escrita)](https://github.com/JoaoAntonioMaruti/winnin/blob/main/lib/usecases/redditPost/mutator.ts) de consultas [(leitura)](https://github.com/JoaoAntonioMaruti/winnin/blob/main/lib/usecases/redditPost/loader.ts)
 - [x] **Chain of Responsibility**: Processamento de requisições em cadeias de handlers, ex da implementação [aqui](https://github.com/JoaoAntonioMaruti/winnin/blob/main/lib/usecases/redditPost/redditPipelineUseCase.ts) e chamada [aqui](https://github.com/JoaoAntonioMaruti/winnin/blob/main/lib/infra/worker/redditPostWorker.ts#L13).
 - [x] **Repository Pattern**: Centraliza a lógica de persistência no banco de dados, ex: [aqui](https://github.com/JoaoAntonioMaruti/winnin/blob/main/lib/infra/database/repo.ts).
 - [x] **Factory Pattern**: Facilita a criação de instâncias para serviços e repositórios.
 - [x] **Decorator Pattern**: Adiciona responsabilidades extras a funções sem modificá-las diretamente.

## Pontos Fortes

 - **Modularidade e Escalabilidade**: O uso de CQRS e pg-boss garante uma arquitetura escalável e de fácil manutenção.
 - **Boas Práticas**: O código é estruturado com boas práticas como Clean Architecture, Design Patterns e testes automatizados.

## Pontos de Melhoria/TODO

 - [ ] **Utilizar validações de schema na camada de domain**: Implementar validações de entidade na camada de domínio para garantir consistência de dados.
 - [ ] **Aumentar a cobertura de testes em geral**: Expandir a cobertura para incluir mais cenários, garantindo robustez do sistema em produção.
 - [ ] **Tratamento de Erros**: Um sistema de logging mais robusto e integração com monitoramento de erros (ex.: Sentry) seria bom.
 - [ ] **Deploy e distribuiÇão**: Não terminei de configurar o deploy com fly.io (por isso a configuração do Docker não está pronta), mas tenho outros serviços que rodam por lá.
 - [ ] **Embora utilize um sistema de filas**, essas filas são gerenciadas pelo mesmo banco de dados da aplicação, o que pode gerar gargalos. Duas soluções recomendadas:
   - Utilizar outro banco de dados como Redis para filas mais leves.
   - Adotar sistemas de filas mais robustos, como **[RabbitMQ](https://www.rabbitmq.com/)**, **[Kafka](https://kafka.apache.org/)** ou **[Amazon SQS](https://aws.amazon.com/sqs/)** e etc....
