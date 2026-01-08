import { Router } from 'express';
import usersRoutes from './users.routes';
import postsRoutes from './posts.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);

export default router;
