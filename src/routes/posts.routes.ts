import { Router, Request, Response } from 'express';
import { externalApiService } from '../services/externalApi.service';

const router = Router();

// Get all posts
router.get('/', async (req: Request, res: Response) => {
  const posts = await externalApiService.getPosts();
  res.json(posts);
});

// Get post by ID
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const post = await externalApiService.getPostById(id);
  res.json(post);
});

// Create post
router.post('/', async (req: Request, res: Response) => {
  const post = await externalApiService.createPost(req.body);
  res.status(201).json(post);
});

export default router;
