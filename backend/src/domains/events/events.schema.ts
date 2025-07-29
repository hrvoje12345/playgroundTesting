import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: text().notNull(),
  startDate: timestamp().notNull(),
  endDate: timestamp().notNull(),
  googleId: text(),
  email: text(),
}, 
(table) => ({
  uniqueEvent: unique().on(table.googleId),
}));

export type EventsRow = InferSelectModel<typeof events>;
export type InserEventsRow = InferInsertModel<typeof events>;
