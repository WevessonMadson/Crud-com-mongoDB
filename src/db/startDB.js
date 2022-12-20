import { mongoose } from "mongoose";
mongoose.set('strictQuery', true);

export const startDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("conectado ao banco de dados!"));
};

// esse módulo deve ser importado no arquivo principal e a função deve ser instaciada lá

/* 
  exemplo:
    1- import { database } from './src/db/connection.js';
       database();

    2- require(./src/db/connection).database();
*/


