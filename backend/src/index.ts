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

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: getEnv(EnvVariable.FrontendUrl),
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initializeDbCLient();
googleOAuth(app);
eventsController(app);
authenticateController(app);

app.listen(getEnv(EnvVariable.Port), (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server running at ${getEnv(EnvVariable.BackendUrl)}`);
});
