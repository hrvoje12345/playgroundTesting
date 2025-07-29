import type { Express } from 'express';
import { google } from 'googleapis'

import { findAll } from './events.service';

import { Path } from '../../values/Path';

export const eventsController = (app: Express) => {
    app.get(Path.Events, async (request, response, next) => {
        const events = await findAll();
        const accessToken = request.cookies.accessToken;
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
          access_token: accessToken,
        });
        const calendar = google.calendar({ auth: oauth2Client, version: 'v3'})

        const eventsFromCalendar = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        response.json(events);

        next();
    });

    app.post(Path.Events, () => {});
}
