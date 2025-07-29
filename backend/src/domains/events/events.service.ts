import type { Express } from 'express';
import type { InferInsertModel } from 'drizzle-orm';

import { queryAll, saveAll } from './events.repository';
import { events } from '../../db/schema';

export const findAll = async () => {
    return queryAll();
}

export const saveMultiple = async (eventsToSave: InferInsertModel<typeof events>[]) => {
    return saveAll(eventsToSave);
}
