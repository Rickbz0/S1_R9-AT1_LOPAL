const fs = require("fs");
const prompt = require("prompt-sync")();


let entregas = [];

let continuar = "sim";

while (continuar === "sim") {
    console.log("\nCadastro de Entrega");

    let nome = prompt("Nome do cliente:");
    let endereco = prompt("Endereço do cliente:");
    let distancia = parseFloat(prompt("Distancia km:"));
    let valorKM = parseFloat(prompt("Valor por km R$:"));
    let tipo = prompt("Tipo de entrega normal ou urgente:");

    let custo = distancia * valorKM;

    if (tipo === "urgente") {
        custo += custo * 0.2; 
    }


    let entrega = {
        nome,
        endereco,
        distancia,
        valorKM,
        tipo,
        custo
    };

    
    entregas[entregas] = entrega;

    continuar = prompt("\nDeseja cadastrar outra entrega? sim ou nao: ");
}


let totalEntregas = entregas;
let somaCustos = 0;

for (let i = 0; i < entregas; i++) {
    somaCustos += entregas[i].custo;
}


let nomeArquivo = "historico_entregas.txt";
let cabecalho = "Cliente\tEndereço\tDistância(km)\tR$/km\tTipo\t\tCusto(R$)\n";
let conteudo = cabecalho;

for (let i = 0; i < entregas; i++) {
    let e = entregas[i];
    conteudo += `${e.nome} ${e.endereco} ${e.distancia}km R$${e.valorKM.toFixed(2)} ${e.tipo} R$${e.custo.toFixed(2)}\n`;
}

conteudo += \nTotal de entregas: ${totalEntregas};
conteudo += \nValor total de todos os custos: R$${somaCustos.toFixed(2)}\n;

fs.writeFileSync(nomeArquivo, conteudo, "utf8");
console.log("\nresumo da entrega:", nomeArquivo);
