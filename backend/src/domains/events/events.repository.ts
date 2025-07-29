import type { Express } from 'express';

import { dbClient } from '../../db/client';

export const queryAll = async () => {
    return dbClient().query.events.findMany();
}
