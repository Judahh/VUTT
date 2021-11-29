import dBHandler from './dBHandler';
import { SimpleApp } from '@backapirest/express';
import Index from './routes/index';
import dotEnv from 'dotenv';

dotEnv.config();

const app = new SimpleApp(Index.getInstance(), dBHandler).express;
// databaseHandler.getInstance().migrate();
const port = process.env.PORT || 3005;

app.listen(port);
console.log('Server is running in http://localhost:' + port + '...');
