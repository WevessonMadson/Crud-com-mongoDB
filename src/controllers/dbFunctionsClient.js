import { Clientes } from "../models/clientModel.js";
import { jsPDF } from 'jspdf';
const doc = new jsPDF();


export const gerarRelatorio = (clientes) => {
    let dados = '';
    for (let i = 0; i < clientes.length; i++) {
        for (let key in clientes[i]) {
            if (key == '_id' || key == 'nome' || key == 'cpf' || key == 'email')
                dados += `${key}: ${clientes[i][key]}\n`;
        }
        dados += `-------------------------------------------------------------------------------------\n`;
    }
    doc.text(dados, 10, 10);
    doc.save('./src/relatorio.pdf');
}

export async function inserir(objeto) {
    const cliente = new Clientes(objeto);
    try {
        await cliente.save();
    } catch (error) {
        console.error(error)
    }
}

export async function buscar(id) {
    if (!id) {
        return Clientes.find();
    } else {
        let cliente = await Clientes.findOne({ _id: id });
        return cliente;
    }
}

export async function deletar(id) {
    try {
        await Clientes.findOneAndDelete({ _id: id });
    } catch (error) {
        console.error(error);
    }
}

export async function alterar(id, objeto) {
    try {
        await Clientes.findOneAndUpdate({ _id: id }, objeto);
    } catch (error) {
        console.error(error);
    }
}