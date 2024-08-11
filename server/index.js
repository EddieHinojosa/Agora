import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { PORT } from './config/env.js';
import { corsOptions } from './config/corsOptions.js';
import { sessionConfig } from './config/session.js';
import { limiter } from './config/rateLimiter.js';
import routes from './routes/index.js';

const app = express();

app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);

app.use(sessionConfig);

app.use(routes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();