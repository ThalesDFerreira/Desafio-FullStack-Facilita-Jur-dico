
![Sem título](https://github.com/ThalesDFerreira/Desafio-FullStack-Facilita-Jur-dico/assets/99926224/a92b15cd-e809-4d63-8cd1-084bd56aef29)


ANTES DAS CONFIGURAÇÕES INICIAIS

Projeto FlullStack realizado mediante desafio técnico, onde gerencia cadastro de clientes cadastrando, editando e deletando clientes, bem como listando e filtrando os clientes. Como parte importante desse projeto foi feito na API uma forma otimizada de visitar esses clientes por meio de um plano cartesiano.

Dito isso, requer-se para execução desse projeto que tenha em seu sistema o seguinte:

"NodeJS" e "npm";
"PostgresSQL";
"Git";

CONFIGURAÇÕES INICIAIS

1 - Faça o clone do projeto com uma das opções abaixo sem as aspas:

HTTPS - "git clone https://github.com/ThalesDFerreira/Desafio-FullStack-Facilita-Jur-dico.git"
SSH - "git clone git@github.com:ThalesDFerreira/Desafio-FullStack-Facilita-Jur-dico.git.git"
2 - Após você entrará na diretório do projeto: "cd Desafio-FullStack-Facilita-Jur-dico"

3 - Existirá dois diretórios, um do frontend e outro do backend.

4 - Será preciso instalar as dependências do projeto, para isso você deverá entrar em cada um dos diretórios e executar o comando "npm instal" no terminal.

5 - Caso não saiba como ir até o diretório, e tendo como parametro que você se encontra na pasta raiz do clone efetuado, basta executar o comando abaixo:

frontend - "cd frontend && npm install" // entra no diretório frontend e instala as dependências;
"cd .." // voltar para pasta raiz do projeto
backend - "cd backend && npm install" // entra no diretório backend e instala as dependências;
6 - Após a instalação de todas as dependências dos projetos, você precisará configurar o arquivo que está nos diretórios raiz do frontend e backend chamado "env_exemple" e renomea-lo para ".env".

7 - Agora você precisará iniciar o Banco de Dados com esse comando:

"npm run db:reset"
8 - Feito isso, agora precisara executar a inicialização dos projetos frontend e backend, ou seja, ter dois terminaism um no diretório backend, e outro no frontend. Feito isso, basta executar o comando de execução nos dois terminais:

"npm run dev"

FRONT-END

Para ter acesso ao frontend localmente você precisará acessar do navegador o endpoit abaixo:

http://localhost:5173/


**SEGUE ABAIXO A DDL da tabela do banco de dados:**

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone BIGINT,
    coordinate_x INT,
    coordinate_y INT
);
