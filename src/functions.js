//importação do módulo para acesso as funções de leitura e gravação do arquivo json:
import { readFileSync, writeFileSync } from 'fs';

//importação do módulo de criação do arquivo .pdf
import { jsPDF } from 'jspdf';
const doc = new jsPDF();

// função que traz todos os dados do json e transforma em objeto:
const clientesRead = () => {
    const dados = readFileSync('./src/clientes.json', "utf-8");
    return JSON.parse(dados);
};

// função que sobrescreve os dados no json:
const clientesUpdate = (dados) => {
    writeFileSync('./src/clientes.json', JSON.stringify(dados), "utf-8");
};

// função para gerar um novo ID:
const newId = () => {
    let maior = 0;
    clientesRead().forEach(element => {
        if (element.id > maior){
            maior = element.id;
        }
    });
    return maior + 1
};

// função de geração do arquivo .pdf
const gerarRelatorio = () => {
    const clientes = clientesRead();
    let dados = '';
    for (let i = 0; i < clientes.length; i++) {
        for (let key in clientes[i]) {
            dados += `${key}: ${clientes[i][key]}\n`;
        }
        dados += `-------------------------------------------------------------------------------------\n`;
    }
    doc.text(dados, 10, 10);
    doc.save('./src/relatorio.pdf');
}

export { clientesRead, clientesUpdate, newId, gerarRelatorio };