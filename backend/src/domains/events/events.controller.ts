import type { Express } from 'express';

import { findAll } from './events.service';

import { Path } from '../../values/Path';

export const eventsController = (app: Express) => {
    app.get(Path.Events, async (request, response, next) => {
        const events = await findAll()

        response.json(events);

        next();
    });

    app.post(Path.Events, () => {});
}
