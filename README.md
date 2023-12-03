# Sistema Backend com NestJS

Este projeto é um sistema backend desenvolvido com o framework NestJS. Ele utiliza um banco de dados que é configurado e inicializado através de um arquivo `docker-compose.yml`.

## Pré-requisitos

- Node.js
- npm ou yarn
- Docker e Docker Compose

## Configuração do Ambiente

Antes de iniciar o projeto, é necessário configurar o ambiente de desenvolvimento.

### Passo 1: Clonar o Repositório

Clone este repositório para o seu ambiente local:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_DIRETORIO>
```

# Passo 2: Iniciar o Banco de Dados com Docker
Antes de iniciar o aplicativo, você deve iniciar o banco de dados. Este projeto utiliza o Docker para gerenciar o banco de dados, facilitando a configuração e garantindo a consistência do ambiente.

Execute o seguinte comando:
```bash
docker-compose up -d
```
Este comando irá inicializar e rodar o banco de dados em um container Docker em segundo plano.

# Passo 3: Instalar Dependências
Instale todas as dependências necessárias do projeto:
```bash
npm install
```

# Passo 4: Executar o Projeto
Após a configuração do banco de dados e a instalação das dependências, o projeto pode ser iniciado com:
```bash
npm run start
```
O servidor backend agora deve estar rodando e acessível.