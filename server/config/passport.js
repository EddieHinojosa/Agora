import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.VITE_JWT_SECRET,
};

export default (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.sub);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            console.error('JWT Strategy Error:', error);
            return done(error, false);
        }
    }));

    const generateUniqueUsername = async (base) => {
        let username = base;
        let userExists = await User.findOne({ username });

        let counter = 1;
        while (userExists) {
            username = `${base}${counter}`;
            userExists = await User.findOne({ username });
            counter++;
        }

        return username;
    };

    passport.use(new GoogleStrategy({
        clientID: process.env.VITE_GOOGLE_CLIENT_ID,
        clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.NODE_ENV === 'production'
            ? process.env.VITE_PROD_API_URL + '/api/auth/google/callback'
            : process.env.VITE_DEV_API_URL + '/api/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('Google profile:', profile);
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                return done(null, user);
            }

            user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                // Handle the case where a different Google account has the same email
                if (user.googleId && user.googleId !== profile.id) {
                    return done(null, false, { message: 'This email is already associated with another Google account.' });
                }

                user.googleId = profile.id;
                user.isGmail = profile.emails[0].value.endsWith('@gmail.com') || profile.emails[0].value.endsWith('@googlemail.com');
                await user.save();
                return done(null, user);
            }
            const baseUsername = profile.emails[0].value.split('@')[0];
            const uniqueUsername = await generateUniqueUsername(baseUsername);

            user = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                username: uniqueUsername,
                isGmail: profile.emails[0].value.endsWith('@gmail.com') || profile.emails[0].value.endsWith('@googlemail.com'),
                billingAddress: { street: '', city: '', state: '', zip: '', country: '' },
                mailingAddress: { street: '', city: '', state: '', zip: '', country: '' }
            });
            await user.save();
            done(null, user);
            
            // Store profile in session and redirect to profile completion page
            done(null, false, { profile });
        } catch (error) {
            console.error('Google Strategy Error:', error);
            done(error, false);
        }
    }));

    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }

            return done(null, user);
        } catch (error) {
            console.error('Local Strategy Error:', error);
            return done(error, false);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            console.error('Deserialize User Error:', error);
            done(error, null);
        }
    });
};


