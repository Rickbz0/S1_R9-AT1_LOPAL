const fs = require("fs");
const prompt = require("prompt-sync")();

let entregas = [];
let continuar = "sim";

while (continuar === "sim" || continuar === "sim") {
    console.log("cadastro da entrega");

    let nome = prompt("nome do cliente: ");
    let endereco = prompt("endereco do cliente: ");
    let distancia = parseFloat(prompt("distancia em km: "));
    let valorKM = parseFloat(prompt("valor por km : "));
    let tipo = prompt("tipo de entrega normal ou urgente: ");

    let custo = distancia * valorKM;
    if (tipo === "urgente" || tipo === "urgente") {
        custo *= 1.2; 
    }

    entregas.push({ nome, endereco, distancia, valorKM, tipo, custo });

    continuar = prompt("quer cadastrar outra entrega? sim ou não: ");
}

let totalEntregas = entregas;
let somaCustos = 0;

for (let i = 0; i < entregas; i++) {
    somaCustos += entregas[i].custo;
}


let nomeArquivo = "historicoDEentregas.txt";
let cabecalho = "Cliente, Endereço, Distancia em km, valor por km, Tipo, Custo em reais";
let conteudo = cabecalho;


for (let i = 0; i < entregas; i++) {
    let entrega = entregas[i];
    conteudo += `${entrega.nome}, ${entrega.endereco}, ${entrega.distancia}, valorKM${entrega.valorKM.toFixed(2)}, ${entrega.tipo}, R$${entrega.custo.toFixed(2)}`;
}

conteudo += `total de entregas: ${totalEntregas}`;
conteudo += `valor total de todos os custos: ${somaCustos.toFixed(2)}`;

fs.writeFileSync(nomeArquivo, conteudo, "utf-8");

console.log("resumo das entregas:");
console.log(`arquivo "${nomeArquivo}" salvo com sucesso.`);
