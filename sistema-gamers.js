const prompt = require("prompt-sync")();

let time = [];
let continuar = true;

function mostrarMenu () {
  console.log("\n======= SISTEMA GAMERS =======");
  console.log("1. CADASTRAR");
  console.log("2. DELETAR");
  console.log("3. MOSTRAR EQUIPE");
  console.log("4. FAZER BUSCA")
  console.log("5. CÁLCULO DA MÉDIA DA EQUIPE");
  console.log("6. SAIR");
  console.log("==============================");
  console.log("\n");
}

function cadastrarJogador () {
  let nomeJogador = prompt("Digite o nome do usuário: ");
  let funcaoJogador = prompt("Digite a função do jogador: ");
  let pontuacaoJogador = Number(prompt("Digite a pontuação: "));

  if(isNaN(pontuacaoJogador)){
    console.log("Pontuação inválida.");
    return;
  }else{
    let recruta = {
      nome: nomeJogador,
      funcao: funcaoJogador,
      pontuacao: pontuacaoJogador,
    }
    time.push(recruta);
    console.log("Usuário "+nomeJogador+" cadastrado com sucesso.");
  }
}

function deletarJogador() {
  if(time.length == 0){
    console.log("Nenhum jogador cadastrado na equipe.");
    return;
    }
  
  let nomeDeletado = prompt("Digite o nome a ser deletado: ");
  let indexDeletado = -1;
  for(let i = 0; i < time.length; i++){
    if(time[i].nome == nomeDeletado){
      indexDeletado = i;
      break;
    }
  }

  if(indexDeletado == -1){
    console.log("Jogador não encontrado.");
    return;
    }

    time.splice(indexDeletado, 1);
    console.log("Jogador ",nomeDeletado," deletado com sucesso.");
}

function mostrarEquipe() {
  if(time.length == 0) {
    return;
  }
  for(let i = 0; i < time.length; i++){
    let jogador = time[i];
    console.log((i + 1)+". " + jogador.nome + " | Função: "+ jogador.funcao + " | Pontuação: " + jogador.pontuacao);
  }
}

function calcularMedia() {
  if(time.length == 0){
    console.log("Nenhum jogador cadastrado na equipe.");
    return;
  }
  
  let totalPontos = 0;
 
  for(let i = 0; i < time.length; i++){
    totalPontos = totalPontos + time[i].pontuacao;
  }
  let mediaPontos = totalPontos / time.length;
  console.log("A média total da equipe é: "+ mediaPontos.toFixed(2) +" pontos.");
}

function fazerBusca () {
  if(time.length == 0){
    console.log("Nenhum jogador cadastrado na equipe.");
    return;
    }
  
  let pesquisaJogador = prompt("Digite o nome do jogador: ");
  
  for(let i = 0; i < time.length; i++){
    if(time[i].nome == pesquisaJogador){
      jogadorProcurado = time[i];
      console.log((i + 1)+". " + jogadorProcurado.nome + " | Função: "+ jogadorProcurado.funcao + " | Pontuação: " + jogadorProcurado.pontuacao);
      return;
    }  
  }
    console.log("Nenhum jogador encontrado.")
  }

while(continuar == true){

  mostrarMenu();
  let opcao = prompt("Digite a opção desejada: ");

  if(opcao == "1"){
  cadastrarJogador();
  }
  else if(opcao == "2"){
  deletarJogador();
  }
  else if(opcao == "3"){
  mostrarEquipe();
  }
  else if(opcao == "4"){
    fazerBusca();
  }
  else if(opcao == "5"){
    calcularMedia();
  }
  
  else if(opcao == "6"){
  continuar = false;
  }
  else{
  console.log("Opção invalida, tente novamente.");
  }
}
  
  
  


