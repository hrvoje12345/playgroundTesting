import type { Express } from 'express';
import type { InferInsertModel } from 'drizzle-orm';


import { dbClient } from '../../db/client';
import { events } from '../../db/schema';

export const queryAll = async () => {
    return dbClient().query.events.findMany();
}

export const saveAll = async (eventsToSave: InferInsertModel<typeof events>[]) => {
    return dbClient().insert(events).values(eventsToSave).onConflictDoNothing()
};
