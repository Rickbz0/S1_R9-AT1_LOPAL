// calculadoraEntrega.js

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const entregas = [];

function pergunta(pergunta) {
  return new Promise(resolve => rl.question(pergunta, resolve));
}

async function main() {
  console.log('=== Sistema de Entregas ===');

  while (true) {
    const nome = await pergunta('Nome do cliente (ou "sair" para encerrar): ');
    if (nome.toLowerCase() === 'sair') break;

    const endereco = await pergunta('Endereço: ');
    const distancia = Number(await pergunta('Distância (km): '));
    const valorKm = Number(await pergunta('Valor por km: '));
    const tipo = (await pergunta('Tipo (normal/urgente): ')).toLowerCase();

    let custo = distancia * valorKm;
    if (tipo === 'urgente') custo *= 1.2;
    custo = Number(custo.toFixed(2));

    entregas.push({ nome, endereco, distancia, valorKm, tipo, custo });

    console.log(`
Resumo da entrega:
Cliente:   ${nome}
Endereço:  ${endereco}
Distância: ${distancia} km
Tipo:      ${tipo}
Custo:     R$ ${custo}
    `);
  }

  rl.close();

  const total = entregas.length;
  const soma = entregas.reduce((acc, e) => acc + e.custo, 0);
  const media = total ? (soma / total).toFixed(2) : 0;

  console.log(`\nTotal de entregas: ${total}`);
  console.log(`Média de custos: R$ ${media}`);

  const dados = entregas.map(e =>
    `${e.nome};${e.endereco};${e.distancia};${e.valorKm};${e.tipo};${e.custo}`
  ).join('\n') + '\n';

  fs.appendFileSync('historico.txt', dados);
  console.log('Histórico salvo em historico.txt');
}

main();
