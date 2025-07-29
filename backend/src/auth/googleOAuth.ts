import passport from 'passport';
import session from 'express-session';
import { Strategy } from 'passport-google-oauth20';

import { getEnv } from '../utils/getEnv';
import { EnvVariable } from '../values/EnvVariable';
import { Path } from '../values/Path';

import type { Express } from 'express';

export const googleOAuth = (app: Express) => {
    app.use(session({
        secret: getEnv(EnvVariable.SessionSecret),
        resave: false,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        console.log('serializeUser', user)
        done(null, user);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = { user: 'todo1' };
            console.log('deserializeUser', id, user)

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
            (accessToken, refreshToken, profile, done) => {
            try {
                console.log('Strategy', { accessToken, refreshToken, profile });

                // STORE USERS

                return done(null, { user: 'todo' });
            } catch (error) {
                return done(error, false);
            }
            }
        )
    );

    app.get(Path.AuthGoogle, passport.authenticate('google', { scope: ['profile'] }));

    app.get(Path.AuthGoogleCallback, 
        passport.authenticate('google', { successRedirect: getEnv(EnvVariable.FrontendUrl), failureRedirect: `${getEnv(EnvVariable.FrontendUrl)}/login` }),
        (request, response, next) => {
            response.redirect('/');
            next(); 
        }
    );

    app.post("/logout", (request, response, next) => {
        request.logOut(() => {
            response.redirect('/');
            next();
        });
    });
}