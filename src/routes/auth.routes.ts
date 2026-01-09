import { Router, Request, Response } from 'express';

const router = Router();

// Mock user database (replace with real database later)
const mockUsers = [
  { 
    id: 1, 
    email: 'admin@example.com', 
    password: 'admin123', 
    name: 'Admin User', 
    role: 'admin' 
  },
  { 
    id: 2, 
    email: 'user@example.com', 
    password: 'user123', 
    name: 'Regular User', 
    role: 'user' 
  },
  { 
    id: 3, 
    email: 'demo@example.com', 
    password: 'demo123', 
    name: 'Demo User', 
    role: 'user' 
  }
];

// POST /auth/login
router.post('/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', { email });

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate mock token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;
    const refreshToken = `mock-refresh-token-${user.id}-${Date.now()}`;

    return res.json({
      success: true,
      data: {
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// POST /auth/logout
router.post('/logout', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    message: 'Logout successful'
  });
});

// GET /auth/me
router.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'No authorization token provided'
    });
  }

  // Mock user data (in production, verify JWT token)
  const mockUser = mockUsers[0];
  
  return res.json({
    success: true,
    data: {
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
      role: mockUser.role
    }
  });
});

// POST /auth/refresh
router.post('/refresh', (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: 'Refresh token is required'
    });
  }

  // Generate new token
  const newToken = `mock-jwt-token-refreshed-${Date.now()}`;

  return res.json({
    success: true,
    data: {
      token: newToken
    },
    message: 'Token refreshed successfully'
  });
});

export default router;