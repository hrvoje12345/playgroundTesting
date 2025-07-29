import { google } from 'googleapis';

import {
  queryEventsByEmail,
  upsertEvent,
  upsertEvents,
} from './events.repository';
import { InserEventsRow } from './events.schema';

export const getGoogleCalendarApi = (accessToken: string) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  return google.calendar({ auth: oauth2Client, version: 'v3' });
};

export const fetchEvents = async (email: string, range: '1' | '7' | '30') => {
  return queryEventsByEmail(email, range);
};

export const saveEvents = async (events: InserEventsRow[]) => {
  await upsertEvents(events);
};

export const createEvent = async (
  accessToken: string,
  event: Omit<InserEventsRow, 'googleId'>,
) => {
  const googlePreparedEvent = {
    start: {
      dateTime: event.startDate.toISOString(),
      timeZone: 'Europe/Zagreb',
    },
    end: {
      dateTime: event.endDate.toISOString(),
      timeZone: 'Europe/Zagreb',
    },
    summary: event.name,
  };

  const calendar = getGoogleCalendarApi(accessToken);
  const googleCreatedEvent = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: { ...googlePreparedEvent },
  });

  const dbPreparedEvent = {
    ...event,
    googleId: googleCreatedEvent.data.id,
  };

  await upsertEvent(dbPreparedEvent);
  return dbPreparedEvent;
};
