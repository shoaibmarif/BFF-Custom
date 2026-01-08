import { Router, Request, Response } from 'express';

const router = Router();

// Simple in-memory demo user
const demoUser = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  role: 'admin',
};

// POST /auth/login
router.post('/login', (req: Request, res: Response) => {
  const { email } = req.body;

  // Accept any credentials for now; replace with real auth later
  const token = 'demo-token';
  const refreshToken = 'demo-refresh-token';
  const user = { ...demoUser, email: email || demoUser.email };

  return res.json({ token, refreshToken, user });
});

// POST /auth/logout
router.post('/logout', (_req: Request, res: Response) => {
  return res.status(204).send();
});

// GET /auth/me
router.get('/me', (_req: Request, res: Response) => {
  return res.json(demoUser);
});

// POST /auth/refresh
router.post('/refresh', (_req: Request, res: Response) => {
  return res.json({ token: 'demo-token-refreshed' });
});

export default router;