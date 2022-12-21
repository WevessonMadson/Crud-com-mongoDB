import { v4 as uuid } from 'uuid';
import { gerarRelatorio, inserir, buscar, deletar, alterar } from './dbFunctionsClient.js';

class ClientControllers {

    cadastrar = async (req, resp) => {
        try {
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
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: "Ocorreu um erro interno no servidor." });
        }
    }

    consultar = async (req, resp) => {
        try {
            const id = req.params.id;
            if (!id) {
                let clientes = await buscar();
                if (clientes.length == 0) {
                    resp.status(404).json({ message: "Não há clientes cadastrados." });
                } else {
                    resp.status(200).json(clientes);
                }
            } else {
                let cliente = await buscar(id);
                if (cliente) {
                    resp.status(200).json(cliente);
                } else {
                    resp.status(404).json({ message: "Cliente não encontrado." });
                }
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: "Ocorreu um erro interno no servidor." });
        }
    }

    editar = async (req, resp) => {
        try {
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
                resp.status(404).json({ message: "Cliente não encontrado." });
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: "Ocorreu um erro interno no servidor." });
        }
    }

    excluir = async (req, resp) => {
        try {
            const id = req.params.id;
            const cliente = await buscar(id);
            if (cliente) {
                await deletar(id);
                resp.status(200).json({ message: "Deletado com sucesso!" });
            } else {
                resp.status(404).json({ message: "Cliente não encontrado." });
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: "Ocorreu um erro interno no servidor." });
        }
    }

    relatorio = async (req, resp) => {
        try {
            let clientes = await buscar();
            if (clientes.length == 0) {
                resp.status(404).json({ message: "Não há clientes cadastrados para gerar o relatório." });
            } else {
                gerarRelatorio(clientes);
                resp.status(200).download('./src/relatorio.pdf');
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: "Ocorreu um erro interno no servidor." });
        }
    }
}

export default new ClientControllers();
