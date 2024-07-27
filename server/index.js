import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';
import passportConfig from './config/passport.js';
import authRoutes from './routes/auth.js';
import shopRoutes from './routes/shop.js';


dotenv.config()

console.log('Server environment variables:', {
    VITE_MONGO_URI: process.env.VITE_MONGO_URI,
    VITE_GOOGLE_CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID,
    VITE_GOOGLE_CLIENT_SECRET: process.env.VITE_GOOGLE_CLIENT_SECRET,
    VITE_SESSION_SECRET: process.env.VITE_SESSION_SECRET,
    VITE_JWT_SECRET: process.env.VITE_JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    VITE_DEV_URL: process.env.VITE_DEV_URL,
    VITE_DEV_API_URL: process.env.VITE_DEV_API_URL,
    VITE_PROD_API_URL: process.env.VITE_PROD_API_URL,
  });

const app = express();
const PORT = process.env.PORT || 5000; 

// Enable CORS
const allowedOrigins = [process.env.VITE_DEV_API_URL, process.env.VITE_PROD_API_URL];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
// Parse JSON
app.use(express.json());

// Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://apis.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://*.google.com"],
      connectSrc: ["'self'", "https://accounts.google.com", process.env.VITE_DEV_API_URL, process.env.VITE_PROD_API_URL],
      frameSrc: ["'self'", "https://accounts.google.com"],
    },
  })
);

// Connect to MongoDB
const mongoUri = process.env.VITE_MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(mongoUri, {
        ssl: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


// Session middleware
app.use(session({
    secret: process.env.VITE_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoUri }),
    cookie: {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    }
}));

// Initialize Passport and session
passportConfig(passport); // Initialize passport strategies
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', authRoutes);
app.use('/api', shopRoutes);




//-----------------eddie calendar stuff in process-----------------
// // Import the googleapis library
// import { google } from 'googleapis';
// const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.REDIRECT);

// // Google OAuth2 callback------need to fix the routing (Eddie)---------------
// app.get('/', (req, res) => {
//     const url = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: "https://www.googleapis.com/auth/calendar.readonly"
//     });
//     res.redirect(url);
// });

// app.get('/redirect', (req, res) => {
//     const code = req.query.code;
//     oauth2Client.getToken(code, (err, tokens) => {
//         if (err){
//             console.error('Error retrieving access token', err);
//             res.send('Error');  
//             return;
//         }
//         oauth2Client.setCredentials(tokens);
//         res.send('Successfully logged in');
//     });
// });


// app.get('/calendar', (req, res) => {
//     const calendar = google.calendar({version: 'v3', auth: oauth2Client});
//     calendar.calendarList.list({}, (err,response)=> {
//         if(err){
//             console.error('Error fetching calendar list', err);
//             res.end('Error');
//             return;
//         }
//         const calendars = response.data.items;
//         res.json(calendars);
//     });
// })

// app.get('events',(req,res)=> {
//     const calendarId = req.query.calendar??'primary';
//     const calendar = google.calendar({version: 'v3', auth: oauth2Client});
//     calendar.events.list({
//         calendarId,
//         timeMin: (new Date()).toISOString(),
//         maxResults: 10,
//         singleEvents: true,
//         orderBy: 'startTime'
//     },(err, response)=> {
//         if(err){
//             console.error('calendar event list fetch error');
//             res.end('Error');
//             return;
//         }
//         const events = response.data.items;
//         res.json(events);
//     });
// });

// // --------------------need to fix the routing (Eddie)-----------------------




// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...poop poop`);
});

