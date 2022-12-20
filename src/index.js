//importação do módulo para levantar um servidor:
import express, { Router } from 'express';

const app = express();

//configuração do tipo de arquivo que será usado para comunicação, nesse caso o json:
app.use(express.json({ extended: true }));
app.use(Router)

export default app;