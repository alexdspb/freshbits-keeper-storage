const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');

dotenv.config({ path: '.env' });

connectDb();

const app = express();
const router = express.Router();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/api/v1', require('./routes/notebooks'));
app.use('/api/v1', require('./routes/notes'));

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;

app.listen(PORT, HOST);
console.log(`Server running in ${process.env.NODE_ENV} mode on ${HOST}:${PORT}`);
