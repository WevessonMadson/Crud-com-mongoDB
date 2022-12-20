import { Clientes } from "../models/clientModel.js";

// Onde tem o paramentro objeto, deverá ser os dados que serão passados, os dados do cliente para cadastro e edição

// Essas funções deve ser importadas no arquivo de rotas para usá-las: import { inserir, buscar, deletar, alterar } from './controllers/clientsControllers.js';

export async function inserir(objeto) {
    const cliente = new Clientes(objeto);
    try{
        await cliente.save();
    } catch(error) {
        console.error(error)
    }
}

export async function buscar(id) {
    if (!id) {
        return Clientes.find();
    } else {
        let cliente = await Clientes.findOne({_id: id});
        return cliente;
    }
}

export async function deletar(id) {
    try{
        await Clientes.findOneAndDelete({_id: id});
    } catch(error) {
        console.error(error);
    }
}

export async function alterar(id, objeto) {
    try{
        await Clientes.findOneAndUpdate({_id: id}, objeto);
    } catch(error) {
        console.error(error);
    }
}

