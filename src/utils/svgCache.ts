/**
 * SVG 快取工具，用於優化 Liquid Glass 效能的 SVG 生成
 */

interface CacheKey {
  width: number;
  height: number;
  radius: number;
  depth: number;
  strength: number;
  chromaticAberration: number;
}

interface CacheEntry {
  url: string;
  timestamp: number;
}

class SVGCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize = 100; // 最大快取條目數
  private maxAge = 5 * 60 * 1000; // 5分鐘過期

  private generateKey(key: CacheKey): string {
    return `${key.width}x${key.height}_r${key.radius}_d${key.depth}_s${key.strength}_c${key.chromaticAberration}`;
  }

  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > this.maxAge;
  }

  private cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    
    // 移除過期條目
    entries.forEach(([key, entry]) => {
      if (now - entry.timestamp > this.maxAge) {
        this.cache.delete(key);
      }
    });

    // 如果仍然超過最大大小，移除最舊的條目
    if (this.cache.size > this.maxSize) {
      const sortedEntries = entries
        .filter(([key]) => this.cache.has(key))
        .sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      const toRemove = sortedEntries.slice(0, this.cache.size - this.maxSize);
      toRemove.forEach(([key]) => this.cache.delete(key));
    }
  }

  get(key: CacheKey): string | null {
    const cacheKey = this.generateKey(key);
    const entry = this.cache.get(cacheKey);
    
    if (!entry || this.isExpired(entry)) {
      if (entry) {
        this.cache.delete(cacheKey);
      }
      return null;
    }
    
    return entry.url;
  }

  set(key: CacheKey, url: string): void {
    const cacheKey = this.generateKey(key);
    
    this.cache.set(cacheKey, {
      url,
      timestamp: Date.now(),
    });
    
    // 定期清理快取
    if (this.cache.size > this.maxSize * 0.8) {
      this.cleanup();
    }
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// 導出單例實例
export const svgCache = new SVGCache();

// 導出類型
export type { CacheKey };




