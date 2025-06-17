const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const entregas = [];

function perguntar(texto) {
  return new Promise(resolve => rl.question(texto, resp => resolve(resp)));
}

async function main() {
  console.log('sistema de calculo de entregas');

  while (true) {
    const nome = await perguntar('nome do cliente ou "sair" para encerrar: ');
    if (nome.toLowerCase() === 'sair') break;

    const endereco = await perguntar('Endereço do cliente: ');
    const distancia = parseFloat(await perguntar('Distância da entrega (km): '));
    const valorKm = parseFloat(await perguntar('Valor cobrado por km: '));
    let tipo = await perguntar('Tipo de entrega ("normal" ou "urgente"): ');
    tipo = tipo.toLowerCase() === 'urgente' ? 'urgente' : 'normal';

    let custo = distancia * valorKm;
    if (tipo === 'urgente') {
      custo *= 1.2; 
    }
    custo = parseFloat(custo.toFixed(2)); 

    const registro = { nome, endereco, distancia, valorKm, tipo, custo };
    entregas.push(registro);

    console.log('\nresumo da entrega');
    console.log(`cliente: ${nome}`);
    console.log(`endereço: ${endereco}`);
    console.log(`distância: ${distancia} km`);
    console.log(`valor por km: R$ ${valorKm.toFixed(2)}`);
    console.log(`tipo: ${tipo}`);
    console.log(`custo total: R$ ${custo.toFixed(2)}\n`);
  }

  rl.close();

  const total = entregas.length;
  const soma = entregas.reduce((acc, e) => acc + e.custo, 0);
  const media = total ? (soma / total).toFixed(2) : 0;

  console.log('\nrelatorio Final');
  console.log(`total de entregas realizadas: ${total}`);
  console.log(`media de custo por entrega: R$ ${media}`);

  const historico = entregas.map(e =>
    `${e.nome};${e.endereco};${e.distancia};${e.valorKm};${e.tipo};${e.custo}`
  ).join('\n') + '\n';
  fs.appendFileSync('historicoentregas.txt', historico);
  console.log('historico registrado em "historicoentregas.txt".');
}

main();
