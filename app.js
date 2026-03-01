import express from 'express';
import router from './src/routes.js';
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use('/api', router);

export default app;