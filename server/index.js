import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import helmet from 'helmet';
import cloudinary from './config/cloudinary.js';
import authRoutes from './routes/auth.js';
import shopRoutes from './routes/shop.js';
import userRoutes from './routes/user.js';
import favicon from 'serve-favicon';
import rateLimit from 'express-rate-limit';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import MongoStore from 'connect-mongo';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
//temporarily added local and the link for testing
const allowedOrigins = [`http://localhost:5173`, 'https://agora-crafts.onrender.com', process.env.VITE_DEV_API_URL, process.env.VITE_DEV_URL, process.env.VITE_PROD_API_URL, process.env.VITE_PROD_URL];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON
app.use(express.json());

// Serve the favicon
// app.use(favicon(join(__dirname, 'public', 'favicon.ico')));

// Helmet for security headers
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP only
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    ieNoOpen: true,
    noSniff: true,
    xssFilter: true,
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

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
    store: MongoStore.create({ mongoUrl: mongoUri }), // Correctly initialize MongoStore
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
    }
}));

// Routes
app.use('/api/auth', authRoutes);
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
