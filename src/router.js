//importação do módulo para levantar um servidor:
import express from 'express';

const app = express();

//configuração do tipo de arquivo que será usado para comunicação, nesse caso o json:
app.use(express.json({ extended: true }));

import { clientesRead, clientesUpdate, newId, gerarRelatorio } from './functions.js';

// rota de cadastro de um novo cliente:
app.post("/clientes", (req, resp) =>{
    const {id, nome, cpf, email} = req.body;
    if (id != undefined) {
        resp.send({"message": "Não é possível cadastrar, você não pode enviar um ID."});
    }else if (nome == undefined || cpf == undefined || email == undefined) {
        resp.send({"message": "Não é possível cadastrar, faltam dados."});
    } else {
        const id = newId();
        const currentClientes = clientesRead();
        currentClientes.push({id, nome, cpf, email});
        clientesUpdate(currentClientes);
        resp.send({"message": "Cadastrado com sucesso!"});
    }
});

// rota de consulta de um cliente pelo ID:
app.get("/clientes/:id", (req, resp) => {
    const id = req.params.id;
    const existe = clientesRead().some(element => element.id == id);
    if (existe) {
        resp.send(JSON.stringify(clientesRead().find(element => element.id == id)));
    } else {
        resp.send({"message": "Cliente não encontrado."});
    }
});

// rota de exclusão de um cliente pelo ID:
app.delete("/clientes/:id", (req, resp) => {
    const id = req.params.id;
    const existe = clientesRead().some(element => element.id == id);
    if (existe) {
        const index = clientesRead().findIndex(array => array.id == id);
        const currentClientes = clientesRead();
        currentClientes.splice(index, 1);
        clientesUpdate(currentClientes);
        resp.send({"message": "Deletado com sucesso!"});
    } else {
        resp.send({"message": "Cliente não encontrado."});
    }
});

// rota de atualização de um cliente pelo ID:
app.put("/clientes/:id", (req, resp) => {
    const id = req.params.id;
    const existe = clientesRead().some(element => element.id == id);
    if (existe) {
        const {nome, cpf, email} = req.body;
        const index = clientesRead().findIndex(array => array.id == id);
        const currentClientes = clientesRead();
        currentClientes[index].nome = nome?nome:currentClientes[index].nome;
        currentClientes[index].cpf = cpf?cpf:currentClientes[index].cpf;
        currentClientes[index].email = email?email:currentClientes[index].email;
        clientesUpdate(currentClientes);
        resp.send({"message": "Editado com sucesso!"});
    } else {
        resp.send({"message": "Cliente não encontrado."});
    }
});

// rota de consulta de todos os clientes cadastrados:
app.get("/clientes", (req, resp) => {
    if (clientesRead().length == 0){
        resp.send({"message": "Não há clientes cadastrados."})
    }else {
        resp.send(JSON.stringify(clientesRead()));
    }
});

// rota para geração de um relatório em pdf com todos os clientes:
app.get("/relatorio/clientes", async (req, resp) => {
    if (clientesRead().length == 0){
        resp.send({"message": "Não há clientes cadastrados para gerar o relatório."})
    }else {
        gerarRelatorio();
        resp.send({"message": "relatório gerado em ./src/"});
    }
});

export default app;