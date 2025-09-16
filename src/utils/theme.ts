/**
 * Theme utilities for GlassHeartUI
 */

export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  theme: Theme;
  glassIntensity: 'light' | 'medium' | 'heavy';
  animationSpeed: 'slow' | 'normal' | 'fast';
  reducedMotion: boolean;
}

/**
 * Apply theme to document
 */
export const applyTheme = (theme: Theme): void => {
  document.documentElement.setAttribute('data-theme', theme);
};

/**
 * Get current theme
 */
export const getCurrentTheme = (): Theme => {
  return document.documentElement.getAttribute('data-theme') as Theme || 'light';
};

/**
 * Toggle between light and dark theme
 */
export const toggleTheme = (): Theme => {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  return newTheme;
};

/**
 * Set glass intensity
 */
export const setGlassIntensity = (intensity: 'light' | 'medium' | 'heavy'): void => {
  document.documentElement.style.setProperty('--gh-glass-opacity', `var(--gh-glass-${intensity}-opacity)`);
  document.documentElement.style.setProperty('--gh-glass-blur', `var(--gh-glass-${intensity}-blur)`);
};

/**
 * Set animation speed
 */
export const setAnimationSpeed = (speed: 'slow' | 'normal' | 'fast'): void => {
  const duration = speed === 'slow' ? '0.5s' : speed === 'fast' ? '0.15s' : '0.3s';
  document.documentElement.style.setProperty('--gh-animation-duration', duration);
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Initialize theme system
 */
export const initTheme = (config?: Partial<ThemeConfig>): void => {
  const defaultConfig: ThemeConfig = {
    theme: 'light',
    glassIntensity: 'medium',
    animationSpeed: 'normal',
    reducedMotion: prefersReducedMotion(),
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Apply theme
  applyTheme(finalConfig.theme);

  // Apply glass intensity
  setGlassIntensity(finalConfig.glassIntensity);

  // Apply animation speed
  setAnimationSpeed(finalConfig.animationSpeed);

  // Handle reduced motion
  if (finalConfig.reducedMotion) {
    document.documentElement.style.setProperty('--gh-animation-duration', '0.01ms');
  }

  // Listen for theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('gh-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Listen for reduced motion changes
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) {
      document.documentElement.style.setProperty('--gh-animation-duration', '0.01ms');
    } else {
      setAnimationSpeed(finalConfig.animationSpeed);
    }
  });
};

/**
 * Save theme to localStorage
 */
export const saveTheme = (theme: Theme): void => {
  localStorage.setItem('gh-theme', theme);
};

/**
 * Load theme from localStorage
 */
export const loadTheme = (): Theme | null => {
  return localStorage.getItem('gh-theme') as Theme | null;
};

/**
 * Auto-detect and apply theme
 */
export const autoDetectTheme = (): Theme => {
  const savedTheme = loadTheme();
  if (savedTheme) {
    applyTheme(savedTheme);
    return savedTheme;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDark ? 'dark' : 'light';
  applyTheme(theme);
  return theme;
};
