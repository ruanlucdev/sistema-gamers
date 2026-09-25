# 🎮 Sistema Gerenciador de Gamers (eSports CLI)

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Status-Conclu%C3%ADdo-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Interface-CLI%20Terminal-blueviolet?style=for-the-badge" alt="CLI" />
</p>

> Aplicação interativa em linha de comando (CLI) desenvolvida em **Node.js** para gerenciamento completo de equipes de eSports. Conta com operações de cadastro, remoção, listagem, busca inteligente case-insensitive/parcial, **atualização dinâmica de pontuações** e cálculo de média da equipe.

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

O projeto implementa um CRUD com recursos analíticos utilizando conceitos essenciais de JavaScript:
- **Fluxo de Controle:** Loop contínuo com `while` gerenciado por flag (`continuar = true`) e menu com 7 opções estruturadas.
- **Normalização e Tratamento de Strings:** Métodos `.trim()`, `.toLowerCase()` e `.includes()` para tolerância a variações na digitação de nomes.
- **Estruturas de Dados:** `Arrays` contendo `Objetos literais` com propriedades dinamicamente mutáveis (como a pontuação dos atletas).
- **Validações Defensivas:** Bloqueio de inputs vazios, checagem de tipos numéricos com `Number()` / `isNaN()` e proteção contra divisões por zero.

---

## ✨ Funcionalidades

| Opção | Comando | Descrição |
| :---: | :--- | :--- |
| `1` | **CADASTRAR** | Cadastra um jogador informando nome, função tática e pontuação inicial. |
| `2` | **DELETAR** | Remove o jogador da equipe por correspondência de nome. |
| `3` | **MOSTRAR EQUIPE** | Exibe todos os atletas cadastrados com posição, função e pontuação. |
| `4` | **FAZER BUSCA** | Pesquisa avançada por parte do nome (case-insensitive) listando todos os correspondentes. |
| `5` | **ATUALIZAR PONTUAÇÃO** | Localiza um atleta e soma pontos adicionais à sua pontuação atual. |
| `6` | **CÁLCULO DA MÉDIA** | Calcula a pontuação média da equipe com precisão de 2 casas decimais. |
| `7` | **SAIR** | Encerra a aplicação graciosamente. |

---

## 📂 Estrutura do Projeto

```text
sistema-gamers/
├── node_modules/         # Módulos instalados (prompt-sync)
├── .gitignore            # Arquivos ignorados pelo Git
├── package.json          # Metadados do projeto e dependências
├── package-lock.json     # Árvore de versões das dependências
├── README.md             # Documentação completa da aplicação
└── sistema-gamers.js     # Código-fonte principal
```

---

## 🗂️ Estrutura dos Dados

Cada atleta é armazenado na memória na forma de objeto literal:

```javascript
{
  nome: "FalleN",          // String: identificador do jogador
  funcao: "AWPer / IGL",   // String: papel tático no time
  pontuacao: 1250          // Number: pontuação/rating do atleta
}
```

O elenco completo fica reunido no vetor:
```javascript
let time = [];
```

---

## 🔍 Explicação Detalhada das Funções

### 1. `mostrarMenu()`
Exibe a interface textual numerada de 1 a 7 no terminal a cada ciclo da aplicação.

### 2. `cadastrarJogador()`
- Coleta `nomeJogador`, `funcaoJogador` e a pontuação inicial convertida com `Number(prompt(...))`.
- **Validação:** Checa se o valor é numérico com `isNaN()`. Se inválido, aborta com `return`.
- Insere o recruta no array com `time.push(recruta)`.

### 3. `deletarJogador()`
- Checa se o time possui atletas (`time.length == 0`).
- Higieniza a entrada com `.trim().toLowerCase()` e rejeita nomes em branco (`""`).
- Localiza o índice do atleta com `.includes()` e remove o elemento usando `time.splice(indexDeletado, 1)`.

### 4. `mostrarEquipe()`
- Itera sobre o array `time`, exibindo cada jogador com numeração sequencial `(i + 1)`.

### 5. `fazerBusca()`
- Rejeita buscas em branco (`pesquisaJogador == ""`).
- Percorre a lista inteira comparando com `.trim().toLowerCase().includes(pesquisaJogador)`.
- Exibe todos os atletas correspondentes e, se nenhum for achado (`!encontrou`), informa `"Nenhum jogador encontrado."`.

### 6. `atualizarPontuacao()` 🆕
- **Objetivo:** Adicionar pontos à pontuação existente de um jogador.
- **Funcionamento:**
  1. Solicita o nome do jogador com `.trim().toLowerCase()`.
  2. Solicita os pontos a adicionar convertidos para número com `Number(prompt(...))`.
  3. Verifica se a equipe possui atletas cadastrados e se o nome informado não é vazio.
  4. Varre o array procurando o jogador via `.includes()`.
  5. Ao encontrar, atualiza a propriedade somando os novos pontos:  
     `time[i].pontuacao = time[i].pontuacao + pontosAdicionais;`
  6. Exibe a confirmação da atualização e o card do atleta atualizado.

### 7. `calcularMedia()`
- Valida se a equipe possui membros para prevenir divisão por zero.
- Acumula a soma das pontuações em `totalPontos`.
- Divide pelo total de jogadores (`totalPontos / time.length`) e formata com `.toFixed(2)`.

---

## 🛡️ Boas Práticas e Validações Implementadas

- 🔠 **Busca e Exclusão Case-Insensitive:** Uso de `.toLowerCase()` para permitir que o usuário digite sem se preocupar com maiúsculas ou minúsculas.
- ✂️ **Limpeza de Espaços com `.trim()`:** Elimina espaços acidentais no início e no fim das entradas.
- 🔎 **Correspondência Parcial (`.includes()`):** Permite encontrar jogadores informando apenas um trecho do nome/nickname.
- ➕ **Incremento Seguro de Pontuação:** Conversão numérica de `pontosAdicionais` com `Number()`, garantindo operação aritmética de soma em vez de concatenação de strings.
- 🚫 **Bloqueio de Entradas Vazias:** Impede operações acidentais ao apenas pressionar `Enter` nas rotinas de busca, deleção e atualização.
- 🔢 **Validação Numérica Rigorosa:** Verificação de entradas com `isNaN()` no cadastro.
- ⚖️ **Proteção contra Divisão por Zero:** Checagem de `time.length == 0` antes de operações de agregação ou busca.

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
5. ATUALIZAR PONTUAÇÃO
6. CÁLCULO DA MÉDIA DA EQUIPE
7. SAIR
==============================

Digite a opção desejada: 5
Digite o nome do jogador a atualizar os pontos: fallen
Digite os pontos a adicionar: 150
A pontuação do jogador FalleN foi atualizada.
1. FalleN | Função: AWPer / IGL | Pontuação: 1400
```

---

<p align="center">
  Desenvolvido com ☕ e <strong>JavaScript</strong> durante o Curso de JS.
</p>
