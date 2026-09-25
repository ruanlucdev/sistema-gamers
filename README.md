# 🎮 Sistema Gerenciador de Gamers (eSports CLI)

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Status-Conclu%C3%ADdo-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Interface-CLI%20Terminal-blueviolet?style=for-the-badge" alt="CLI" />
</p>

> Aplicação interativa em linha de comando (CLI) desenvolvida em **Node.js** para gerenciamento de line-ups e atletas de eSports. Conta com busca inteligente não sensível a maiúsculas/minúsculas, correspondência parcial de nomes, exclusão segura e cálculo automático de estatísticas.

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Estrutura dos Dados](#-estrutura-dos-dados)
- [Explicação Detalhada das Funções](#-explicação-detalhada-das-funções)
- [🛡️ Boas Práticas e Validações Implementadas](#️-boas-práticas-e-validações-implementadas)
- [Pré-requisitos e Instalação](#-pré-requisitos-e-instalação)
- [Como Executar](#-como-executar)
- [Exemplo Prático de Uso](#-exemplo-prático-de-uso)
- [Autor](#-autor)

---

## 🚀 Visão Geral

O projeto consolida e aprimora conceitos essenciais de JavaScript moderno:
- **Fluxo Interativo Contínuo:** Loop principal `while` com menu de navegação e tratamento de opções.
- **Normalização e Tratamento de Strings:** Uso de métodos como `.trim()`, `.toLowerCase()` e `.includes()` para tolerância a falhas na digitação do usuário.
- **Estruturas de Dados Dinâmicas:** Vetores (`Arrays`) gerenciando coleções de registros modelados em `Objetos literais`.
- **Validações Defensivas:** Prevenção de divisão por zero, bloqueio de entradas vazias ou tipos inválidos.
- **Múltiplos Resultados em Buscas:** Varredura completa da lista com flag booleana de controle, permitindo exibir todos os atletas que satisfazem o critério de busca.

---

## ✨ Funcionalidades

| Opção | Comando | Descrição |
| :---: | :--- | :--- |
| `1` | **CADASTRAR** | Cadastra um jogador com nome, função tática e pontuação (com validação numérica). |
| `2` | **DELETAR** | Exclui um atleta pelo nome com busca inteligente normalizada. |
| `3` | **MOSTRAR EQUIPE** | Lista todos os jogadores cadastrados com posição, função e pontuação. |
| `4` | **FAZER BUSCA** | Pesquisa avançada por parte do nome (case-insensitive) listando **todos** os jogadores encontrados. |
| `5` | **CÁLCULO DA MÉDIA** | Soma todas as pontuações e gera a média aritmética com 2 casas decimais. |
| `6` | **SAIR** | Finaliza o sistema ordenadamente. |

---

## 📂 Estrutura do Projeto

```text
sistema-gamers/
├── node_modules/         # Módulos instalados (prompt-sync)
├── .gitignore            # Arquivos ignorados pelo Git
├── package.json          # Manifesto do projeto e dependências
├── package-lock.json     # Árvore exata de dependências
├── README.md             # Documentação detalhada da aplicação
└── sistema-gamers.js     # Código-fonte principal
```

---

## 🗂️ Estrutura dos Dados

Cada atleta é armazenado na memória na forma de objeto literal:

```javascript
{
  nome: "FalleN",          // String: identificador do jogador
  funcao: "AWPer / IGL",   // String: papel tático no time
  pontuacao: 1250          // Number: pontuação de desempenho
}
```

O elenco completo fica reunido no vetor:
```javascript
let time = [];
```

---

## 🔍 Explicação Detalhada das Funções

### 1. `mostrarMenu()`
Imprime a interface gráfica textual no terminal, apresentando todas as opções disponíveis de `1` a `6`.

### 2. `cadastrarJogador()`
- Coleta `nomeJogador`, `funcaoJogador` e a pontuação convertida para número com `Number(prompt(...))`.
- **Validação de Tipo:** Avalia com `isNaN(pontuacaoJogador)`. Se o valor não for um número válido, a operação é rejeitada com aviso e interrompida via `return`.
- Insere o recruta validado no final do array com `time.push(recruta)`.

### 3. `deletarJogador()`
- **Checagem de Array Vazio:** Interrompe a execução caso não existam atletas cadastrados (`time.length == 0`).
- **Limpeza de Input:** Aplica `.trim().toLowerCase()` na entrada do usuário e impede que a operação continue com valores vazios (`""`).
- **Busca Tolerante:** Varre o time aplicando `.trim().toLowerCase().includes(nomeDeletado)` para encontrar o jogador correspondente.
- Remove o registro exato com `time.splice(indexDeletado, 1)` e confirma a exclusão pelo nome original preservado.

### 4. `mostrarEquipe()`
- Percorre a coleção `time` exibindo os atletas enumerados sequencialmente `(i + 1)`.

### 5. `fazerBusca()`
- **Validação de Entrada:** Impede buscas vazias caso o usuário apenas pressione Enter sem digitar um nome.
- **Normalização:** Utiliza `.trim().toLowerCase()` tanto no termo pesquisado quanto nos nomes da lista.
- **Correspondência Parcial (`.includes()`):** Não exige que o usuário digite o nome completo nem se preocupe com letras maiúsculas/minúsculas.
- **Listagem Completa de Resultados:** Percorre o array do início ao fim sem interrupções prematuras (`return`), listando **todos** os atletas correspondentes.
- **Controle por Flag (`encontrou`):** Caso nenhum atleta atenda ao filtro, avisa amigavelmente `"Nenhum jogador encontrado."`.

### 6. `calcularMedia()`
- Valida se a equipe possui membros para evitar divisões por zero.
- Acumula a soma dos pontos de cada membro em `totalPontos`.
- Calcula a média (`totalPontos / time.length`) e formata o resultado com `.toFixed(2)` para evitar dízimas periódicas.

---

## 🛡️ Boas Práticas e Validações Implementadas

O código foi atualizado com padrões defensivos e melhorias de usabilidade:

### 1. 🔠 Busca e Exclusão Case-Insensitive (`.toLowerCase()`)
Permite que o usuário digite em qualquer combinação de caixa alta ou baixa:
- Cadastrado: `"Gabriel"`
- Busca: `"GABRIEL"`, `"gabriel"` ou `"gAbRiEl"` ➡️ **Reconhece perfeitamente!**

### 2. ✂️ Remoção de Espaços Involuntários (`.trim()`)
Elimina espaços em branco acidentais no início e fim das entradas digitadas pelo usuário (ex: `" gabriel "` é tratado como `"gabriel"`).

### 3. 🔎 Busca por Substring / Correspondência Parcial (`.includes()`)
O usuário não precisa digitar o nome completo. Exemplo:
- Digitando `"gab"` ➡️ Encontra `"Gabriel Toledo"` e `"Gabriel Fernandes"`.
- Digitando `"fall"` ➡️ Encontra `"FalleN"`.

### 4. 👥 Listagem de Múltiplos Registros Coincidentes
A busca não para mais no primeiro resultado encontrado. Todos os atletas que contiverem o termo pesquisado serão listados no terminal.

### 5. 🚫 Bloqueio de Entradas Vazias
Tanto a busca quanto a exclusão verificam se a entrada após o `.trim()` resultou em uma string vazia (`""`), evitando comportamentos inesperados.

### 6. 🔢 Validação Numérica Rigorosa
Uso de `isNaN()` para impedir que valores não-numéricos entrem no cálculo da média da equipe.

### 7. ⚖️ Proteção contra Divisão por Zero
Todas as rotinas que exigem elementos (`deletar`, `buscar`, `calcular média`) realizam a checagem `time.length == 0`.

---

## 📦 Pré-requisitos e Instalação

1. Certifique-se de ter o **[Node.js](https://nodejs.org/)** instalado.
2. Abra o terminal na pasta do projeto:
   ```bash
   cd "Users/Pasta do Projeto"
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

---

## ▶️ Como Executar

Execute o comando no terminal:

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

Digite a opção desejada: 4
Digite o nome do jogador: gab

===== RESULTADO DA BUSCA =====
1. Gabriel Toledo | Função: AWPer | Pontuação: 1250
3. Gabriel Fernandes | Função: Rifler | Pontuação: 1100
```

---

<p align="center">
  Desenvolvido com ☕ e <strong>JavaScript</strong> durante o Curso de JS.
</p>
