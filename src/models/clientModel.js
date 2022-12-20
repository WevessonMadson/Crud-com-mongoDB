import mongoose from 'mongoose';
const { Schema } = mongoose;

// esse é apenas o schema do documento ("tabela")

const clientSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

export const Clientes = mongoose.model('Clientes', clientSchema);