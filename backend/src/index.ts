import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

import { getEnv } from './utils/getEnv';
import { EnvVariable } from './values/EnvVariable';
import { Path } from './values/Path';

const port = getEnv(EnvVariable.GoogleClientId, true) || 3003;

passport.use(
  new Strategy(
    {
      clientID: getEnv(EnvVariable.GoogleClientId),
      clientSecret: getEnv(EnvVariable.GoogleClientSecret),
      callbackURL: `${getEnv(EnvVariable.BackendUrl)}${Path.AuthGoogleCallback}`,
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        console.log({ accessToken, refreshToken, profile });

        // STORE USERS

        return done(null, { user:'todo' });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

const app = express();

app.get(Path.AuthGoogle, passport.authenticate('google', { scope: ['profile'] }));
app.get(Path.AuthGoogleCallback, 
  passport.authenticate('google', { failureRedirect: `${getEnv(EnvVariable.FrontenddUrl)}/login` }),
  (request, response) => {
    response.redirect('/') 
  }
);

app.get(Path.Events, () => {});
app.post(Path.Events, () => {});

app.listen(port, () => {
  console.log(`Server running at ${getEnv(EnvVariable.BackendUrl)}`);
});