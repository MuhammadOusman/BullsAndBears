# CORS Configuration for Bulls & Bears Frontend

## Current Issue
The frontend at `http://localhost:5173` is being blocked by CORS policy when trying to connect to the backend at `https://bulls-bear-backend.vercel.app`.

## Quick Development Solution (Recommended)

### Step 1: Install CORS Browser Extension
For **Chrome/Edge**: 
- Install "CORS Unblock" or "Allow CORS" extension
- Enable it only for development

For **Firefox**:
- Install "CORS Everywhere" extension
- Enable it only for development

### Step 2: Test the Login
1. Enable the CORS extension
2. Refresh the page
3. Try logging in with valid credentials

## Backend Error Analysis
The error shows:
```
POST http://localhost:5173/api/api/auth/login 500 (Internal Server Error)
```

This suggests:
1. ✅ CORS is now bypassed (good!)
2. ❌ There might be an issue with the backend endpoint or request format

## Backend Configuration (Permanent Solution)
The backend needs to be configured to allow requests from the frontend origin. Add this to your backend CORS configuration:

```javascript
// In your backend (Express.js example)
const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:5173',  // Vite dev server
    'http://localhost:3000',  // Alternative dev port
    'https://your-production-domain.com' // Production domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

## Alternative: Vite Proxy Configuration
If you can't modify the backend, enable the proxy in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  server: {
    proxy: {
      '/api': {
        target: 'https://bulls-bear-backend.vercel.app',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
```

Then update the API base URL to use `/api` for development in `src/services/api.js`.

## Testing Backend Endpoints
You can test the backend endpoints directly:

1. **Login Endpoint**: `POST https://bulls-bear-backend.vercel.app/api/auth/login`
2. **Required Headers**: `Content-Type: application/json`
3. **Request Body**: 
```json
{
  "email": "test@example.com",
  "password": "testpassword"
}
```

## Current Frontend Status
- ✅ Frontend is properly configured
- ✅ Error handling is working
- ✅ API client is ready
- ⏳ Waiting for CORS resolution or valid test credentials
