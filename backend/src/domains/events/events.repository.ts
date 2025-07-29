import  { eq } from 'drizzle-orm';
import type { calendar_v3 } from 'googleapis'

import { events, type InserEventsRow } from './events.schema'
import { dbClient } from '../../db/client';

export const queryEventsByEmail = async (email: string) => {
    return dbClient().query.events.findMany({ where: eq(events.email, email) });
}

export const upsertEvent = async(eventRow: InserEventsRow) => {
    return dbClient()
        .insert(events)
        .values(eventRow)
        .onConflictDoUpdate({
            target: events.googleId,
            set: eventRow,
        })
}

export const upsertEvents = async (eventRows: InserEventsRow[]) => {
    return Promise.all(
        eventRows.map(eventRow => upsertEvent(eventRow))
    )
};

export const mapEvents = (events: calendar_v3.Schema$Event[], email: string): InserEventsRow[] => {
    return events.map(({ id, summary, start, end }) => {
        return {
            googleId: id,
            name: summary || "Nameless",
            startDate: start?.dateTime ? new Date(start.dateTime) : new Date(),
            endDate: end?.dateTime ? new Date(end.dateTime) : new Date(),
            email,
        }
    })
}