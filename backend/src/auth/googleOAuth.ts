import passport from 'passport';
import session from 'express-session';
import moment from 'moment';
import { google } from 'googleapis';
import { Strategy } from 'passport-google-oauth20';
import { getEnv } from '../utils/getEnv';
import { EnvVariable } from '../values/EnvVariable';
import { Path } from '../values/Path';
import { mapEvents } from '../domains/events/events.repository';
import {
  getGoogleCalendarApi,
  saveEvents,
} from '../domains/events/events.service';
import type { Express } from 'express';

export const googleOAuth = (app: Express) => {
  app.use(
    session({
      secret: getEnv(EnvVariable.SessionSecret),
      resave: false,
      saveUninitialized: true,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user: any, done) => {
    try {
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new Strategy(
      {
        clientID: getEnv(EnvVariable.GoogleClientId),
        clientSecret: getEnv(EnvVariable.GoogleClientSecret),
        callbackURL: `${getEnv(EnvVariable.BackendUrl)}${Path.AuthGoogleCallback}`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
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
            await saveEvents(
              mapEvents(events.data.items, profile._json.email!),
            );
          }

          return done(null, {
            ...profile,
            email: profile._json.email!,
            accessToken,
            refreshToken,
          });
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );

  app.get(
    Path.AuthGoogle,
    passport.authenticate('google', {
      scope: ['profile', 'https://www.googleapis.com/auth/calendar', 'email'],
    }),
  );

  app.get(
    Path.AuthGoogleCallback,
    passport.authenticate('google', {
      failureRedirect: `${getEnv(EnvVariable.FrontendUrl)}/login`,
    }),
    (request, response, next) => {
      const user = request.user as any;

      if (!user || !user.accessToken) {
        return response.redirect(`${getEnv(EnvVariable.FrontendUrl)}/login`);
      }

      response.cookie('accessToken', user.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60,
      });

      response.redirect(`${getEnv(EnvVariable.FrontendUrl)}/`);
      next();
    },
  );

  app.post(Path.AuthLogout, (request, response, next) => {
    request.logOut(() => {
      response.redirect('/');
      next();
    });
  });
};
