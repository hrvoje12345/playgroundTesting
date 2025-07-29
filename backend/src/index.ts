import express from 'express';

import { googleOAuth } from './auth/googleOAuth';
import { eventsController } from './domains/events/events.controller';
import { initializeDbCLient } from './db/client';
import { getEnv } from './utils/getEnv';
import { EnvVariable } from './values/EnvVariable';

import 'dotenv/config';

const port = getEnv(EnvVariable.Port, true) || 8080;

initializeDbCLient();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

googleOAuth(app);
eventsController(app);

app.listen(port, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server running at ${getEnv(EnvVariable.BackendUrl)}`);
});