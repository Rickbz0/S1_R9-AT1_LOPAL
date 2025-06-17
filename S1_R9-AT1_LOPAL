const fs = require("fs");
const prompt = require("prompt-sync")();

// Vetores para armazenar os dados
let nomes = [];
let endereços = [];
let distanciasKM = [];
let valorKM = [];
let tipoEnt = [];



// Loop para inserir os dados
while (true) {

    let nome = prompt("Nome: ");
    let endereços = prompt("Endereço: ");
    let distanciasKM = prompt("Distância KM: ");
    let valorKM = prompt("Valor KM: ");
    let tipoEnt = prompt ("Tipo de entrega: ");


    nomes.push(nome);
    endereços.push(endereço);
    distanciasKM.push(distancia);
    valorKM.push(valor);
    tipoEnt.push(tipoEntrega);

    let continuar = prompt("\n Deseja adicionar informações de outra pessoa? (S/N): ");
    console.log();

    if (continuar !== "s" && continuar !== "S") {
        break;
    }
}

let nomeArquivo = "info.txt";
let cabecalho = "Nome\t\tEndereço\tDistancia (KM)\n";
let conteudo = cabecalho;

for (let i = 0; i < nomes.length; i++) {
    conteudo += `${nomes[i]}\t\t${pesos[i]}\t\t${alturas[i]}\n`;
}

fs.writeFileSync(nomeArquivo, conteudo, "utf8");