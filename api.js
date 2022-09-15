//importação do módulo para levantar um servidor:
const express = require("express");
const app = express();
//configuração do tipo de arquivo que será usado para comunicação, nesse caso o json:
app.use(express.json({ extended: true }));

//importação do módulo para acesso as funções de leitura e gravação do arquivo json:
const fs = require("fs");

// função que traz todos os dados do json e transforma em objeto:
const clientesRead = () => {
    const dados = fs.readFileSync(__dirname+"/clientes.json", "utf-8");
    return JSON.parse(dados);
};
// função que sobrescreve os dados no json:
const clientesUpdate = (dados) => {
    fs.writeFileSync(__dirname+"/clientes.json", JSON.stringify(dados), "utf-8");
};
//função para gerar um novo ID:
const newId = () => {
    let maior = 0;
    clientesRead().forEach(element => {
        if (element.id > maior){
            maior = element.id;
        }
    });
    return maior + 1
};

//rota de cadastro de um novo cliente:
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

//rota de consulta de um cliente pelo ID:
app.get("/clientes/:id", (req, resp) => {
    const id = req.params.id;
    const existe = clientesRead().some(element => element.id == id);
    if (existe) {
        resp.send(JSON.stringify(clientesRead().find(element => element.id == id)));
    } else {
        resp.send({"message": "Cliente não encontrado."});
    }
});

//rota de exclusão de um cliente pelo ID:
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

//rota de atualização de um cliente pelo ID:
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

//rota de consulta de todos os clientes cadastrados:
app.get("/clientes", (req, resp) => {
    resp.send(JSON.stringify(clientesRead()));
});



app.listen(3000, () => console.log("Servidor online..."));


