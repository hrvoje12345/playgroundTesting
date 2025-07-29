import moment from 'moment';
import { and, asc, eq, gte, lte } from 'drizzle-orm';
import { events, type InserEventsRow, type EventsRow } from './events.schema';
import { dbClient } from '../../db/client';
import type { calendar_v3 } from 'googleapis';

type GroupedEvents = Record<string, EventsRow[]>;

export const queryEventsByEmail = async (
  email: string,
  range: '1' | '7' | '30',
) => {
  const fromDate = moment().toDate();
  const tillDate = moment().add(parseInt(range), 'days').toDate();

  const result = await dbClient().query.events.findMany({
    where: and(
      eq(events.email, email),
      gte(events.startDate, fromDate),
      lte(events.startDate, tillDate),
    ),
    orderBy: asc(events.startDate),
  });

  const grouped: GroupedEvents = {};

  for (const event of result) {
    const eventStart = moment(event.startDate);
    let groupKey: string;

    if (range === '30') {
      groupKey = `Week ${eventStart.isoWeek()} - ${eventStart.startOf('isoWeek').format('YYYY-MM-DD')}`;
    } else {
      groupKey = eventStart.format('YYYY-MM-DD');
    }

    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }

    grouped[groupKey].push(event);
  }

  return grouped;
};

export const upsertEvent = async (eventRow: InserEventsRow) => {
  return dbClient().insert(events).values(eventRow).onConflictDoUpdate({
    target: events.googleId,
    set: eventRow,
  });
};

export const upsertEvents = async (eventRows: InserEventsRow[]) => {
  return Promise.all(eventRows.map((eventRow) => upsertEvent(eventRow)));
};

export const mapEvents = (
  events: calendar_v3.Schema$Event[],
  email: string,
): InserEventsRow[] => {
  return events.map(({ id, summary, start, end }) => {
    return {
      googleId: id,
      name: summary || 'Nameless',
      startDate: start?.dateTime ? new Date(start.dateTime) : new Date(),
      endDate: end?.dateTime ? new Date(end.dateTime) : new Date(),
      email,
    };
  });
};
