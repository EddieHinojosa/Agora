import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import helmet from 'helmet';
import admin from './firebaseAdmin.js';
import authRoutes from './routes/auth.js';
// import firebaseAuthRoutes from './routes/firebaseAuth.js';
import userRoutes from './routes/user.js';
import newProduct from './routes/newProduct.js';
import getProduct from './routes/Products.js';
// import routes from './routes/index.js';
import shopRoutes from './routes/shopRoute.js';

import rateLimit from 'express-rate-limit';
import Stripe from 'stripe';
import MongoStore from 'connect-mongo';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  });
}

const app = express();
const PORT = process.env.PORT || 5000;
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);

app.set('trust proxy', 1);

const allowedOrigins = [
  process.env.VITE_DEV_API_URL,
  process.env.VITE_DEV_URL,
  process.env.VITE_PROD_API_URL,
  process.env.VITE_PROD_URL,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

const mongoUri = process.env.VITE_MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(session({
  secret: process.env.VITE_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: mongoUri }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  }
}));

app.use('/api/auth', authRoutes); // Regular auth routes
// // app.use('/api/firebase-auth', firebaseAuthRoutes); // Firebase auth routes
app.use('/', shopRoutes);
app.use('/api', userRoutes);
app.use('/api', newProduct);
app.use('/api', getProduct);






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
      // Create a Stripe Checkout session
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
          // Update these URLs to match your deployment
          success_url: `${process.env.VITE_PROD_API_URL}/checkout-success`,
          cancel_url: `${process.env.CLIENT_URL}/`,
      });

      // Send the session URL to the client
      res.json({ url: session.url });
  } catch (e) {
      res.status(500).json({ error: e.message });
  }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...poop poop`);
});
