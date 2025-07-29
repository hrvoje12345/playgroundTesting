import { Unauthorized } from '../errors/Unauthorized';

import type { RequestHandler } from 'express';

export const authenticate: RequestHandler = (request, response, next) => {
    if (!request.isAuthenticated()) {
        throw new Unauthorized();
    }

    next();
}