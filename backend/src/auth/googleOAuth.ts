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
            (accessToken, refreshToken, profile, done) => {
            try {
                console.log('Strategy', { accessToken, refreshToken, profile });

                // STORE USERS

                return done(null, { user: profile, accessToken, refreshToken });
            } catch (error) {
                return done(error, false);
            }
            }
        )
    );

    app.get(Path.AuthGoogle, passport.authenticate('google', { scope: ['profile', 'https://www.googleapis.com/auth/calendar'] }));

    app.get(Path.AuthGoogleCallback,
        passport.authenticate('google', { failureRedirect: `${getEnv(EnvVariable.FrontendUrl)}/login` }),
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
        }
    );

    app.post("/logout", (request, response, next) => {
        request.logOut(() => {
            response.redirect('/');
            next();
        });
    });
}