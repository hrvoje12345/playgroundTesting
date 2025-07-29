import type { Express } from 'express';
import { google } from 'googleapis'

import { findAll, saveMultiple } from './events.service';

import { Path } from '../../values/Path';

export const eventsController = (app: Express) => {
    app.get(Path.Events, async (request, response, next) => {
        const accessToken = request.cookies.accessToken;

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
          access_token: accessToken,
        });
        const calendar = google.calendar({ auth: oauth2Client, version: 'v3'})

        const eventsFromCalendar = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 1000,
            singleEvents: true,
            orderBy: 'startTime',
        });

        if (eventsFromCalendar.data.items?.length) {
            const eventsNormalized = eventsFromCalendar.data.items.map(({summary, start, end, id}) => {
                return {
                    name: summary || "Nameless",
                    startDate: start?.dateTime ? new Date(start.dateTime) : new Date(),
                    endDate: end?.dateTime ? new Date(end.dateTime) : new Date(),
                    googleId: id
                }
            })
            await saveMultiple(eventsNormalized)
        }

        const events = await findAll();
        response.json(events);

        next();
    });

    app.post(Path.Events, () => {});
}
