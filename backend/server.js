// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/database');
// require('dotenv').config();

// const app = express();


// // Middleware
// app.use(cors({
//   origin:true,
//   allowedHeaders: ['Content-Type','Authorization'],
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.options('*', cors());

// // Connect to MongoDB
// connectDB();
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/requests', require('./routes/requests'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/reviewer', require('./routes/reviewer'));

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({
//     message: 'Application Hosting Portal Backend is running',
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);

//   if (err.name === 'MulterError') {
//     return res.status(400).json({
//       message: 'File upload error',
//       error: err.message
//     });
//   }

//   if (err.name === 'ValidationError') {
//     return res.status(400).json({
//       message: 'Validation error',
//       error: err.message
//     });
//   }

//   if (err.name === 'JsonWebTokenError') {
//     return res.status(401).json({
//       message: 'Invalid token',
//       error: 'Authentication failed'
//     });
//   }

//   res.status(500).json({
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ 
//     message: 'Route not found',
//     path: req.originalUrl 
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`🗄️  MongoDB URI: ${process.env.MONGODB_URI || 'not set'}`);
//   console.log(`🔗 CORS enabled for frontend development`);
//   console.log(`📁 File uploads: /uploads directory`);
//   console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
// });
const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// ✅ Manual CORS middleware
const allowedOrigins = [
  "https://bhel-project.vercel.app",
  "http://localhost:3000" // optional for local dev
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ Connect to MongoDB
connectDB();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static('uploads'));

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/users', require('./routes/users'));
app.use('/api/reviewer', require('./routes/reviewer'));

// ✅ Health check
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Application Hosting Portal Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'MulterError') {
    return res.status(400).json({ message: 'File upload error', error: err.message });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', error: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token', error: 'Authentication failed' });
  }

  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found', path: req.originalUrl });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
