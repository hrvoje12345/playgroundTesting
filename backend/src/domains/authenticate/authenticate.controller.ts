import type { Express } from 'express';
import { authenticate } from '../../middlewares/authenticate';
import { Path } from '../../values/Path';

export const authenticateController = (app: Express) => {
  app.get(Path.AuthCheck, authenticate, async (request, response, next) => {
    response.status(200).send();

    next();
  });
};
