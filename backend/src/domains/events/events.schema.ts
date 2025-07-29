import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: text().notNull(),
  startDate: timestamp().notNull(),
  endDate: timestamp().notNull(),
});

export type EventsRow = InferSelectModel<typeof events>;
export type InserEventsRow = InferInsertModel<typeof events>;
