# 🎮 Sistema Gerenciador de Gamers (eSports CLI)

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Status-Conclu%C3%ADdo-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Interface-CLI%20Terminal-blueviolet?style=for-the-badge" alt="CLI" />
</p>

> Uma aplicação interativa via terminal (CLI) desenvolvida em **Node.js** para gerenciar e analisar equipes e line-ups de eSports, permitindo controle completo de recrutas, funções táticas e estatísticas de pontuação.

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Estrutura dos Dados](#-estrutura-dos-dados)
- [Explicação Detalhada das Funções](#-explicação-detalhada-das-funções)
- [Pré-requisitos e Instalação](#-pré-requisitos-e-instalação)
- [Como Executar](#-como-executar)
- [Exemplo Prático de Uso](#-exemplo-prático-de-uso)
- [Boas Práticas e Validações](#-boas-práticas-e-validações)
- [Autor](#-autor)

---

## 🚀 Visão Geral

O **Sistema Gamers** foi desenvolvido para colocar em prática conceitos fundamentais de desenvolvimento com JavaScript:
- **Fluxo de Controle:** Loop principal interativo com `while` e tratamento de rotas/opções com `if / else if / else`.
- **Estruturas de Dados:** Manipulação de listas dinâmicas (`Arrays`) contendo registros organizados em pares chave-valor (`Objetos literais`).
- **Comunicação Síncrona via Terminal:** Leitura bloqueante de dados de entrada do usuário com a biblioteca `prompt-sync`.
- **Operações de CRUD & Estatística:** Adição, busca linear com parada antecipada, exclusão com reindexação (`splice`) e cálculo de agregação (média aritmética formatada).

---

## ✨ Funcionalidades

| Opção | Comando / Ação | Descrição |
| :---: | :--- | :--- |
| `1` | **CADASTRAR** | Cadastra um novo jogador com nome, função/role e pontuação (com validação numérica). |
| `2` | **DELETAR** | Remove o jogador da line-up pelo nome informado. |
| `3` | **MOSTRAR EQUIPE** | Lista todos os atletas cadastrados com índice, função e score atual. |
| `4` | **FAZER BUSCA** | Localiza e exibe os detalhes completos de um jogador específico por nome. |
| `5` | **CÁLCULO DA MÉDIA** | Calcula a pontuação média da equipe com precisão de 2 casas decimais. |
| `6` | **SAIR** | Finaliza o programa de forma graciosa. |

---

## 📂 Estrutura do Projeto

```text
sistema-gamers/
├── node_modules/         # Dependências do projeto (prompt-sync)
├── .gitignore            # Arquivos ignorados pelo Git
├── package.json          # Metadados e dependências do projeto
├── package-lock.json     # Árvore de dependências travada
├── README.md             # Documentação detalhada do projeto
└── sistema-gamers.js     # Código-fonte principal da aplicação
```

---

## 🗂️ Estrutura dos Dados

Cada atleta é representado na memória como um objeto JavaScript contendo:

```javascript
{
  nome: "Fallen",          // String: identificador/nickname do jogador
  funcao: "AWPer / IGL",   // String: papel tático do atleta no time
  pontuacao: 1250          // Number: pontuação/rating de performance
}
```

Todos os atletas recrutados ficam armazenados no array global `time`:
```javascript
let time = [];
```

---

## 🔍 Explicação Detalhada das Funções

O arquivo [`sistema-gamers.js`](sistema-gamers.js) é modularizado em funções especializadas com responsabilidades bem definidas:

### 1. `mostrarMenu()`
- **Objetivo:** Renderizar visualmente no console o menu principal com todas as opções numeradas.
- **Funcionamento:** Imprime um cabeçalho estilizado para orientar a escolha do usuário a cada ciclo da aplicação.

### 2. `cadastrarJogador()`
- **Objetivo:** Adicionar um novo atleta ao elenco.
- **Funcionamento:**
  1. Solicita nome (`nomeJogador`) e função (`funcaoJogador`).
  2. Solicita a pontuação convertendo a entrada em número com `Number(prompt(...))`.
  3. **Validação:** Se a pontuação informada não for um número válido (`isNaN(pontuacaoJogador)`), exibe aviso de pontuação inválida e interrompe o cadastro (`return`).
  4. Caso os dados estejam corretos, cria o objeto `recruta` e o insere no final da lista usando `time.push(recruta)`.

### 3. `deletarJogador()`
- **Objetivo:** Excluir um integrante da equipe.
- **Funcionamento:**
  1. Valida se a equipe possui atletas cadastrados (`time.length == 0`).
  2. Solicita o nome do atleta a ser excluído.
  3. Percorre o array `time` procurando o primeiro elemento onde `time[i].nome == nomeDeletado`.
  4. Se o atleta for encontrado, remove o registro através de `time.splice(indexDeletado, 1)` e reajusta a lista automaticamente.
  5. Caso contrário, alerta que o jogador não foi encontrado.

### 4. `mostrarEquipe()`
- **Objetivo:** Listar todos os jogadores do elenco atual.
- **Funcionamento:**
  1. Se a lista estiver vazia, retorna sem imprimir nada desnecessário.
  2. Itera com um laço `for` exibindo cada jogador no formato:
     ```text
     [Posição]. [Nome] | Função: [Função] | Pontuação: [Pontos]
     ```

### 5. `fazerBusca()`
- **Objetivo:** Encontrar instantaneamente os dados de um jogador pelo nickname/nome.
- **Funcionamento:**
  1. Verifica se a lista não está vazia.
  2. Solicita o termo de busca.
  3. Percorre a equipe e, ao encontrar o nome correspondente, exibe os dados do jogador e finaliza a busca imediatamente com um `return` (parada antecipada eficiente).
  4. Se terminar o laço sem correspondência, exibe `"Nenhum jogador encontrado."`.

### 6. `calcularMedia()`
- **Objetivo:** Computar a performance média geral da line-up.
- **Funcionamento:**
  1. Checa se há jogadores cadastrados para evitar divisões por zero.
  2. Acumula a soma dos pontos de todos os membros (`totalPontos`).
  3. Divide o total pela quantidade de atletas (`totalPontos / time.length`).
  4. Exibe a pontuação média formatada com 2 casas decimais usando `mediaPontos.toFixed(2)`.

### 7. Loop Principal (`while (continuar == true)`)
- Controla o ciclo de vida da aplicação.
- Exibe o menu, aguarda a escolha do usuário e despacha para a função correspondente.
- A opção `"6"` altera `continuar = false`, encerrando o programa limpo e ordenado.

---

## 📦 Pré-requisitos e Instalação

1. Tenha o **[Node.js](https://nodejs.org/)** (versão 14 ou superior recomendada) instalado.
2. Abra seu terminal na pasta do projeto:
   ```bash
   cd "c:/Users/Pasta Do Projeto"
   ```
3. Instale a dependência necessária:
   ```bash
   npm install
   ```
   *(Ou diretamente via `npm install prompt-sync`)*

---

## ▶️ Como Executar

Para iniciar o sistema, execute no terminal:

```bash
node sistema-gamers.js
```

---

## 🖥️ Exemplo Prático de Uso

```text
======= SISTEMA GAMERS =======
1. CADASTRAR
2. DELETAR
3. MOSTRAR EQUIPE
4. FAZER BUSCA
5. CÁLCULO DA MÉDIA DA EQUIPE
6. SAIR
==============================

Digite a opção desejada: 1
Digite o nome do usuário: Coldzera
Digite a função do jogador: Rifler / Lurker
Digite a pontuação: 1350
Usuário Coldzera cadastrado com sucesso.

======= SISTEMA GAMERS =======
1. CADASTRAR
2. DELETAR
3. MOSTRAR EQUIPE
4. FAZER BUSCA
5. CÁLCULO DA MÉDIA DA EQUIPE
6. SAIR
==============================

Digite a opção desejada: 3
1. Coldzera | Função: Rifler / Lurker | Pontuação: 1350

======= SISTEMA GAMERS =======
...
Digite a opção desejada: 5
A média total da equipe é: 1350.00 pontos.
```

---

## 🛡️ Boas Práticas e Validações Aplicadas

- ⚠️ **Tratamento de Entradas Inválidas:** Uso de `isNaN()` para impedir inserção de textos como pontuações numéricas.
- 🛡️ **Proteção contra Lista Vazia:** Evita erros de processamento ou divisões por zero em operações que exigem ao menos um jogador.
- ⚡ **Otimização de Pesquisa:** Uso de `return` dentro da busca assim que o alvo é encontrado para poupar ciclos de iteração.
- 🎯 **Precisão Numérica:** Formatação amigável de decimais através de `.toFixed(2)`.

---

<p align="center">
  Desenvolvido com ☕ e <strong>JavaScript</strong> durante o Curso de JS.
</p>
