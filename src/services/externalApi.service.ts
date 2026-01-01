import axios, { AxiosInstance } from 'axios';
import { config } from '../config';
import { User, Post } from '../types';
import { logger } from '../utils/logger';
import { cache } from '../utils/cache';

class ExternalApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.jsonPlaceholderUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        logger.debug(`External API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        logger.error('External API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        logger.debug(`External API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        logger.error('External API Response Error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  // User Management
  async getUsers(): Promise<User[]> {
    const cacheKey = 'users:all';
    const cached = cache.get<User[]>(cacheKey);
    
    if (cached) {
      logger.debug('Cache hit for users list');
      return cached;
    }

    const response = await this.client.get<User[]>('/users');
    cache.set(cacheKey, response.data);
    return response.data;
  }

  async getUserById(id: number): Promise<User> {
    const cacheKey = `user:${id}`;
    const cached = cache.get<User>(cacheKey);
    
    if (cached) {
      logger.debug(`Cache hit for user ${id}`);
      return cached;
    }

    const response = await this.client.get<User>(`/users/${id}`);
    cache.set(cacheKey, response.data);
    return response.data;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const response = await this.client.post<User>('/users', userData);
    cache.delete('users:all'); // Invalidate users list cache
    return response.data;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const response = await this.client.put<User>(`/users/${id}`, userData);
    cache.delete(`user:${id}`);
    cache.delete('users:all');
    return response.data;
  }

  async deleteUser(id: number): Promise<void> {
    await this.client.delete(`/users/${id}`);
    cache.delete(`user:${id}`);
    cache.delete('users:all');
  }

  // Posts Management
  async getPosts(): Promise<Post[]> {
    const cacheKey = 'posts:all';
    const cached = cache.get<Post[]>(cacheKey);
    
    if (cached) {
      logger.debug('Cache hit for posts list');
      return cached;
    }

    const response = await this.client.get<Post[]>('/posts');
    cache.set(cacheKey, response.data);
    return response.data;
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    const cacheKey = `posts:user:${userId}`;
    const cached = cache.get<Post[]>(cacheKey);
    
    if (cached) {
      logger.debug(`Cache hit for user ${userId} posts`);
      return cached;
    }

    const response = await this.client.get<Post[]>(`/posts?userId=${userId}`);
    cache.set(cacheKey, response.data);
    return response.data;
  }

  async getPostById(id: number): Promise<Post> {
    const cacheKey = `post:${id}`;
    const cached = cache.get<Post>(cacheKey);
    
    if (cached) {
      logger.debug(`Cache hit for post ${id}`);
      return cached;
    }

    const response = await this.client.get<Post>(`/posts/${id}`);
    cache.set(cacheKey, response.data);
    return response.data;
  }

  async createPost(postData: Partial<Post>): Promise<Post> {
    const response = await this.client.post<Post>('/posts', postData);
    cache.delete('posts:all');
    return response.data;
  }
}

export const externalApiService = new ExternalApiService();
