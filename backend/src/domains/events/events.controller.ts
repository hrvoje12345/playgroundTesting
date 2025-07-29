import type { Express } from 'express';

import { authenticate } from '../../middlewares/authenticate'

import { createEvent, fetchEvents, getGoogleCalendarApi, saveEvents } from './events.service';

type RequestUser = {
  user: {email: string}
}

import { Path } from '../../values/Path';
import moment from 'moment';
import { mapEvents } from './events.repository';

export const eventsController = (app: Express) => {
    app.get(Path.Events, authenticate, async (request, response, next) => {
      const filters = request.query;
      const logedUser = request.user as RequestUser;
      const events =  await fetchEvents(logedUser.user.email); // TODO ADD FILTERS TO FETCHEVENTS

      response.json(events);

      next();
    });

    app.post(Path.Events, authenticate, async (request, response, next) => {
      const accessToken = request.cookies.accessToken;
      const logedUser = request.user as RequestUser;
      const email = logedUser.user.email;
      const { eventName, date, startTime, endTime } = request.body;

      const event = {
          email,
          name: eventName,
          startDate: new Date(`${date}T${startTime}`),
          endDate: new Date(`${date}T${endTime}`),
      }

      const createdEvent = await createEvent(accessToken, event);
        
      response.status(200);
      response.json(createdEvent)
      
      next();
    });

    app.put(Path.Events, authenticate, async (request, response, next) => {
      const accessToken = request.cookies.accessToken;
      const logedUser = request.user as RequestUser;
      const email = logedUser.user.email;
     
      const calendar = getGoogleCalendarApi(accessToken);

      const events = await calendar.events.list({
          calendarId: 'primary',
          timeMin: moment().utc().add(-3, 'months').toISOString(),
          timeMax: moment().utc().add(3, 'months').toISOString(),
          maxResults: 2500,
          singleEvents: true,
          orderBy: 'startTime',
      });

      if (events.data.items?.length) {
          await saveEvents(mapEvents(events.data.items, email));
      }

      const refreshedEvents = await fetchEvents(email);
        
      response.json(refreshedEvents);
      
      next();
    })
}
