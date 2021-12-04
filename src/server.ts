import dBHandler from './dBHandler';
import { SimpleApp } from '@backapisocket/io';
import Index from './routes/index';
import dotEnv from 'dotenv';

dotEnv.config();
const port = +(process.env.PORT || 3005);
const app = new SimpleApp(Index.getInstance(), dBHandler, port);
// databaseHandler.getInstance().migrate();

console.log('Server is running in http://localhost:' + app.port + '...');
