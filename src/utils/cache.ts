import { CacheEntry } from '../types';
import { config } from '../config';

class MemoryCache {
  private cache: Map<string, CacheEntry<any>>;

  constructor() {
    this.cache = new Map();
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    const age = (now - entry.timestamp) / 1000; // age in seconds

    if (age > config.cache.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, data: T): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };
    this.cache.set(key, entry);
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  size(): number {
    return this.cache.size;
  }
}

export const cache = new MemoryCache();
