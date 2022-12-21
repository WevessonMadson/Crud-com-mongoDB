import app from './src/index.js';
import './src/routers/clientRouters.js';
import * as dotenv from 'dotenv';
import { startDB } from './src/db/startDB.js';

dotenv.config()
startDB();

const porta = 3000;

app.listen(porta, () => console.log(`Servidor online em http://localhost:${porta}`));

