import app from '../index.js';
import cliente from '../controllers/clientControllers.js';


// rota de cadastro de um novo cliente:
app.post("/clientes", cliente.cadastrar);

// rota de consulta de um cliente pelo ID:
app.get("/clientes/:id", cliente.consultar);

// rota de exclusão de um cliente pelo ID:
app.delete("/clientes/:id", cliente.excluir);

// rota de atualização de um cliente pelo ID:
app.put("/clientes/:id", cliente.editar);

// rota de consulta de todos os clientes cadastrados:
app.get("/clientes", cliente.consultar);

// rota para geração de um relatório em pdf com todos os clientes:
app.get("/relatorio/clientes", cliente.relatorio);