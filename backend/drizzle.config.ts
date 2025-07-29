import { defineConfig } from 'drizzle-kit';

import { getEnv } from './src/utils/getEnv';
import { EnvVariable } from './src/values/EnvVariable';

import 'dotenv/config';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: getEnv(EnvVariable.DatabaseUrl),
    ssl: 'require',
  },
  casing: 'snake_case',
});
