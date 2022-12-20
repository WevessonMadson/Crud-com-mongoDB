import app from './index.js';
import { v4 as uuid } from 'uuid';
import { inserir, buscar, deletar, alterar } from './controllers/clientControllers.js';
import router from 'json-server/lib/server/router/index.js';

// rota de cadastro de um novo cliente:
router.post("/clientes", async (req, resp) => {
    const { id, nome, cpf, email } = req.body;
    if (id != undefined) {
        resp.status(400).json({ message: "Não é possível cadastrar, você não pode enviar um ID." });
    } else if (nome == undefined || cpf == undefined || email == undefined) {
        resp.status(400).json({ message: "Não é possível cadastrar, faltam dados." });
    } else {
        const newClient = {
            _id: uuid(),
            nome,
            cpf,
            email
        }
        await inserir(newClient);
        let cliente = await buscar(newClient._id);
        if (cliente) {
            resp.status(201).json({ message: "Cadastrado com sucesso!" });
        } else {
            resp.status(400).json({ message: "Não conseguimos cadastrar o cliente, tente em instantes!" });
        }
    }
});

// rota de consulta de um cliente pelo ID:
router.get("/clientes/:id", async (req, resp) => {
    const id = req.params.id;
    let cliente = await buscar(id);
    if (cliente) {
        resp.status(200).json(cliente);
    } else {
        resp.status(200).json({ message: "Cliente não encontrado." });
    }
});

// rota de exclusão de um cliente pelo ID:
router.delete("/clientes/:id", async (req, resp) => {
    const id = req.params.id;
    const cliente = await buscar(id);
    if (cliente) {
        await deletar(id);
        resp.status(200).json({ message: "Deletado com sucesso!" });
    } else {
        resp.status(200).json({ message: "Cliente não encontrado." });
    }
});

// rota de atualização de um cliente pelo ID:
router.put("/clientes/:id", async (req, resp) => {
    const id = req.params.id;
    let cliente = await buscar(id);
    if (cliente) {
        const { nome, cpf, email } = req.body;
        cliente.nome = nome ? nome : cliente.nome;
        cliente.cpf = cpf ? cpf : cliente.cpf;
        cliente.email = email ? email : cliente.email;
        await alterar(id, cliente);
        resp.status(200).json({ message: "Editado com sucesso!" });
    } else {
        resp.status(200).json({ message: "Cliente não encontrado." });
    }
});

// rota de consulta de todos os clientes cadastrados:
router.get("/clientes", async (req, resp) => {
    let clientes = await buscar();
    if (clientes.length == 0) {
        resp.status(200).json({ message: "Não há clientes cadastrados." })
    } else {
        resp.status(200).json(clientes);
    }
});

// rota para geração de um relatório em pdf com todos os clientes:
router.get("/relatorio/clientes", async (req, resp) => {
    if (clientesRead().length == 0) {
        resp.send({ "message": "Não há clientes cadastrados para gerar o relatório." })
    } else {
        gerarRelatorio();
        resp.send({ "message": "relatório gerado em ./src/" });
    }
});