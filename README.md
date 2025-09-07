# Application Hosting Portal

## Overview
The Application Hosting Portal is a comprehensive system designed to manage application hosting requests through a role-based workflow. It features a RESTful API backend built with Node.js and Express, paired with a modern React frontend using TypeScript and Vite. The system supports multiple user roles including Developer, Reviewer, HOD, DTG, CDT, Hosting Team, and Admin, with secure authentication and file upload capabilities.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB with Mongoose, JSON Web Tokens (JWT), bcryptjs, Multer, CORS
- **Frontend**: React 18 with TypeScript, React Router DOM, Vite, Tailwind CSS, Lucide React

## Features
- Role-based authentication and authorization
- Separate dashboards for different user roles
- File upload support for application hosting requests
- RESTful API endpoints for authentication, user management, requests, and reviews
- Health check endpoint for backend status monitoring

## Prerequisites
- Node.js (version 18 or higher)
- npm (version 9 or higher)
- MongoDB instance (local or cloud)

## Installation and Setup

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or update the `.env` file with required variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
1. Ensure MongoDB is running.
2. Start the backend server:
   ```bash
   cd backend && npm run dev
   ```
3. Start the frontend development server:
   ```bash
   cd frontend && npm run dev
   ```
4. Access the application at `http://localhost:5173`.

### Production Mode
1. Configure production environment variables in `backend/.env`:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_secure_jwt_secret
   ```
2. Start the backend in production mode (start:prod method):
   ```bash
   cd backend && NODE_ENV=production npm start
   ```
3. Build and serve the frontend:
   ```bash
   cd frontend && npm run build && npm run preview
   ```
4. Access the application at `http://localhost:4173`.

## Deployment
- **Backend**: Use PM2 for process management in production.
- **Frontend**: Deploy the `dist/` folder to static hosting platforms like Vercel or Netlify.
- **Database**: Use MongoDB Atlas for cloud database.
- **CORS**: Configured to allow requests from development server, production URL, and localhost:4173 for local production testing.

## Project Structure
- `backend/` - Express API server with MongoDB integration
- `frontend/` - React application with TypeScript
- `backend/routes/` - API route handlers
- `backend/controllers/` - Business logic for endpoints
- `backend/models/` - Mongoose schemas
- `frontend/src/pages/` - Role-specific dashboard pages
- `frontend/src/components/` - Reusable UI components

## Notes
- Ensure MongoDB is accessible via the connection string.
- File uploads are stored in the `backend/uploads/` directory.
- CORS is configured to allow requests from the frontend development server, production URL, and localhost:4173 for local production testing.
- Use the health check endpoint `GET /api/health` to verify backend status.

## License
This project is licensed under the MIT License.

---
*Prepared professionally for internship submission.*
