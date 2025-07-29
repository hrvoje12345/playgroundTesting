import { getEnv } from '../utils/getEnv';
import { EnvVariable } from '../values/EnvVariable';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

let clientInstance: PostgresJsDatabase<typeof schema> | null = null;

export const initializeDbCLient = () => {
  if (!clientInstance) {
    const sql = postgres(getEnv(EnvVariable.DatabaseUrl), { ssl: 'require' });

    clientInstance = drizzle(sql, { schema, casing: 'snake_case' });
  }

  return clientInstance;
};

export const dbClient = () => {
  return initializeDbCLient();
};
