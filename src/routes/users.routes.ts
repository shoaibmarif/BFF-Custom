import { Router, Request, Response } from 'express';
import { externalApiService } from '../services/externalApi.service';

const router = Router();

// Mock data fallback when external API is unavailable
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', username: 'bobjohnson' }
];

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await externalApiService.getUsers();
    res.json(users);
  } catch (error) {
    // Fallback to mock data if external API fails
    console.log('Using mock data due to external API error');
    res.json(mockUsers);
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const user = await externalApiService.getUserById(id);
  res.json(user);
});

// Create user
router.post('/', async (req: Request, res: Response) => {
  const user = await externalApiService.createUser(req.body);
  res.status(201).json(user);
});

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const user = await externalApiService.updateUser(id, req.body);
  res.json(user);
});

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await externalApiService.deleteUser(id);
  res.status(204).send();
});

// Get user posts
router.get('/:id/posts', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const posts = await externalApiService.getPostsByUserId(userId);
  res.json(posts);
});

export default router;
