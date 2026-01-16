import express from 'express';
import router from './src/routes.js';

const app = express();

app.use(express.json());
app.use('/api', router);

export default app;