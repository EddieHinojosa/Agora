import session from 'express-session';
import MongoStore from 'connect-mongo';
import { mongoUri, sessionSecret } from './env.js';

export const sessionConfig = session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoUri }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        sameSite: 'none',
        secure: true,
    },
});