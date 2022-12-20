import app from './src/index.js';
import * as dotenv from 'dotenv';
dotenv.config()
import { startDB } from './src/db/startDB.js';
startDB();

const porta = 3000;

app.listen(porta, () => console.log(`Servidor online em http://localhost:${porta}`));

