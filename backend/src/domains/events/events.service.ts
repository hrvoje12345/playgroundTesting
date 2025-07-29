import type { Express } from 'express';

import { queryAll } from './events.repository';

export const findAll = async () => {
    return queryAll();
}
