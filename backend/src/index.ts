import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { googleOAuth } from './auth/googleOAuth';
import { eventsController } from './domains/events/events.controller';
import { initializeDbCLient } from './db/client';
import { getEnv } from './utils/getEnv';
import { EnvVariable } from './values/EnvVariable';

import 'dotenv/config';
import { authenticateController } from './domains/authenticate/authenticate.controller';

const port = getEnv(EnvVariable.Port, true) || 8080;
const frontendUrl = getEnv(EnvVariable.FrontendUrl, true) || 'http://localhost:3000';

initializeDbCLient();

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: frontendUrl,
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

googleOAuth(app);
eventsController(app);
authenticateController(app);

app.listen(port, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server running at ${getEnv(EnvVariable.BackendUrl)}`);
});