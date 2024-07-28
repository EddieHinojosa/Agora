import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';
import passportConfig from './config/passport.js';
import authRoutes from './routes/auth.js';
import shopRoutes from './routes/shop.js';
import userRoutes from './routes/user.js';
import setupSocket from './sockets/socket.js';
import http from 'http';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Enable CORS with specific origins and headers
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5173', 'https://agora-crafts.onrender.com', 'https://agora-6bm6.onrender.com'], //agora-6bm6 is for multi transaction testing on eddie branch, will remove once done
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
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
      connectSrc: ["'self'", "https://accounts.google.com"],
      frameSrc: ["'self'", "https://accounts.google.com"],
    },
  })
);

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  }
}));

// Initialize Passport and session
passportConfig(passport); // Initialize passport strategies
app.use(passport.initialize());
app.use(passport.session());

// Setup Socket.IO
setupSocket(server);

// Routes
app.use('/api', authRoutes);
app.use('/api', shopRoutes);
app.use('/api', userRoutes); // User routes


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

// Stripe Checkout Session route
app.post('/api/create-checkout-session', async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.amount,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`, //need success page
        cancel_url: `${process.env.CLIENT_URL}/cart`, //may redirect back
      });
  
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...poop poop`);
});