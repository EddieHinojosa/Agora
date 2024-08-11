import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import helmet from 'helmet';
import routes from './routes/index.js';
import rateLimit from 'express-rate-limit';
import MongoStore from 'connect-mongo';



const app = express();
const PORT = process.env.PORT || 5000;


app.set('trust proxy', 1);

const allowedOrigins = [
  process.env.VITE_DEV_API_URL,
  process.env.VITE_DEV_APP_URL,
  process.env.VITE_PROD_API_URL,
  process.env.VITE_PROD_APP_URL,
];

const corsOptions = {
  origin: function (origin, callback) {
    // console.log(origin, allowedOrigins);
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
app.use(express.urlencoded({ extended: true }));

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

app.use(routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
