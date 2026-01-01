# BFF Server

Backend for Frontend (BFF) API Gateway for the Approved microfrontend application.

## Features

- ✅ API Gateway pattern - hides external API URLs from frontend
- ✅ Request/Response caching with configurable TTL
- ✅ Rate limiting per IP
- ✅ CORS configuration for all microfrontends
- ✅ Security headers with Helmet
- ✅ Request logging and monitoring
- ✅ Error handling and transformation
- ✅ TypeScript support
- ✅ Compression for responses

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=4000
NODE_ENV=development
JSON_PLACEHOLDER_URL=https://jsonplaceholder.typicode.com
ALLOWED_ORIGINS=http://localhost:5000,http://localhost:5001,...
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CACHE_TTL=300
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/posts` - Get user posts

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create post

### Health
- `GET /health` - Server health check

## Architecture

```
Frontend (custom-main) → BFF Server → External API (JSONPlaceholder)
                           ↓
                    Cache, Rate Limit,
                    Transform, Secure
```

## Cache Strategy

- Users list: 5 minutes
- Individual users: 5 minutes
- Posts: 5 minutes
- Cache automatically invalidated on create/update/delete operations
