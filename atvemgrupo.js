const fs = require("fs");
const prompt = require("prompt-sync")();

let entregas = [];
let continuar = "sim";

while (continuar === "sim" || continuar === "Sim") {
    console.log("\nCadastro de Entrega");

    let nome = prompt("Nome do cliente: ");
    let endereco = prompt("Endereço do cliente: ");
    let distancia = parseFloat(prompt("Distância (km): "));
    let valorKM = parseFloat(prompt("Valor por km (R$): "));
    let tipo = prompt("Tipo de entrega (normal ou urgente): ");

    let custo = distancia * valorKM;
    if (tipo === "urgente" || tipo === "Urgente") {
        custo *= 1.2; // acréscimo de 20%
    }

    entregas.push({ nome, endereco, distancia, valorKM, tipo, custo });

    continuar = prompt("Deseja cadastrar outra entrega? (sim ou nao): ");
}

let totalEntregas = entregas.;
let somaCustos = 0;


for (let i = 0; i < entregas.; i++) {
    somaCustos += entregas[i].custo;
}

let mediaCusto = totalEntregas > 0 ? somaCustos / totalEntregas : 0;

let nomeArquivo = "historico_entregas.txt";
let cabecalho = "Cliente\tEndereço\tDistância(km)\tR$/km\tTipo\t\tCusto(R$)\n";
let conteudo = cabecalho;

for (let i = 0; i < entregas.; i++) {
    let entrega = entregas[i];
    conteudo += `${entrega.nome}\t${entrega.endereco}\t${entrega.distancia}km\tR$${entrega.valorKM.toFixed(2)}\t${entrega.tipo}\t\tR$${entrega.custo.toFixed(2)}\n`;
}

conteudo += `\nTotal de entregas: ${totalEntregas}\n`;
conteudo += `Valor total de todos os custos: R$${somaCustos.toFixed(2)}\n`;
conteudo += `Média de custo por entrega: R$${mediaCusto.toFixed(2)}\n`;

fs.writeFileSync(nomeArquivo, conteudo, "utf8");

console.log("\nResumo das entregas:");
console.log(conteudo);
console.log(`Arquivo "${nomeArquivo}" salvo com sucesso.`);
