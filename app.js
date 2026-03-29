import express from 'express';
import swaggerUi from 'swagger-ui-express';
import router from './src/routes.js';
import swaggerSpec from './src/docs/swagger.js';
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.get('/api/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(null, {
  explorer: true,
  swaggerOptions: {
    url: '/api/docs.json',
  },
}));
app.use('/api', router);

export default app;
