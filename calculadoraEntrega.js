// calculadoraEntrega.js

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Vetor para armazenar registros de entregas
const entregas = [];

// Função que pergunta ao usuário e retorna resposta como Promise
function perguntar(texto) {
  return new Promise(resolve => rl.question(texto, resp => resolve(resp)));
}

async function main() {
  console.log('--- Sistema de Cálculo de Entregas ---');

  while (true) {
    const nome = await perguntar('Nome do cliente (ou digite "sair" para encerrar): ');
    if (nome.toLowerCase() === 'sair') break;

    const endereco = await perguntar('Endereço do cliente: ');
    const distancia = parseFloat(await perguntar('Distância da entrega (km): '));
    const valorKm = parseFloat(await perguntar('Valor cobrado por km: '));
    let tipo = await perguntar('Tipo de entrega ("normal" ou "urgente"): ');
    tipo = tipo.toLowerCase() === 'urgente' ? 'urgente' : 'normal';

    let custo = distancia * valorKm;
    if (tipo === 'urgente') {
      custo *= 1.2; // acréscimo de 20%
    }
    custo = parseFloat(custo.toFixed(2)); // arredonda duas casas

    const registro = { nome, endereco, distancia, valorKm, tipo, custo };
    entregas.push(registro);

    console.log('\n--- Resumo da Entrega ---');
    console.log(`Cliente: ${nome}`);
    console.log(`Endereço: ${endereco}`);
    console.log(`Distância: ${distancia} km`);
    console.log(`Valor por km: R$ ${valorKm.toFixed(2)}`);
    console.log(`Tipo: ${tipo}`);
    console.log(`Custo total: R$ ${custo.toFixed(2)}\n`);
  }

  rl.close();

  const total = entregas.length;
  const soma = entregas.reduce((acc, e) => acc + e.custo, 0);
  const media = total ? (soma / total).toFixed(2) : 0;

  console.log('\n--- Relatório Final ---');
  console.log(`Total de entregas realizadas: ${total}`);
  console.log(`Média de custo por entrega: R$ ${media}`);

  // Grava histórico em arquivo
  const historico = entregas.map(e =>
    `${e.nome};${e.endereco};${e.distancia};${e.valorKm};${e.tipo};${e.custo}`
  ).join('\n') + '\n';
  fs.appendFileSync('historico_entregas.txt', historico);
  console.log('Histórico registrado em "historico_entregas.txt".');
}

main();
