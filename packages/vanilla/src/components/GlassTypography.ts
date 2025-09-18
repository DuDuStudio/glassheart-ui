export interface GlassTypographyOptions {
  children: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  glass?: 'light' | 'medium' | 'heavy';
  liquid?: boolean;
  gradient?: boolean;
  animated?: boolean;
  className?: string;
  style?: Record<string, any>;
  fontFamily?: string;
  letterSpacing?: number;
  lineHeight?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textShadow?: boolean;
  glow?: boolean;
  glowColor?: string;
  glowIntensity?: number;
  blur?: number;
  opacity?: number;
  saturation?: number;
  brightness?: number;
  contrast?: number;
}

export class GlassTypography {
  private element: HTMLElement;
  private canvas!: HTMLCanvasElement;
  private fallback!: HTMLDivElement;
  private options: Required<GlassTypographyOptions>;
  private isLoaded = false;
  private dimensions = { width: 0, height: 0 };
  private animationRef?: number;
  private resizeObserver?: ResizeObserver;

  constructor(container: HTMLElement, options: GlassTypographyOptions) {
    this.element = container;
    this.options = {
      variant: 'p',
      size: 'md',
      weight: 'normal',
      glass: 'medium',
      liquid: false,
      gradient: false,
      animated: false,
      className: '',
      style: {},
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      letterSpacing: 0,
      lineHeight: 1.2,
      textAlign: 'left',
      textShadow: true,
      glow: false,
      glowColor: '#ffffff',
      glowIntensity: 0.8,
      blur: 20,
      opacity: 0.2,
      saturation: 180,
      brightness: 1.2,
      contrast: 1.1,
      ...options,
      children: options.children || '',
    };

    this.init();
  }

  private init() {
    this.createElements();
    this.setupEventListeners();
    this.updateDimensions();
    this.drawGlassText();
  }

  private createElements() {
    // 創建容器
    this.element.className = this.getComponentClasses();
    this.element.style.cssText = this.getContainerStyle();

    // 創建 Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'gh-typography-canvas';
    this.canvas.style.cssText = this.getCanvasStyle();

    // 創建 Fallback
    this.fallback = document.createElement('div');
    this.fallback.className = 'gh-typography-fallback';
    this.fallback.style.cssText = this.getFallbackStyle();
    this.fallback.textContent = this.options.children;

    // 添加元素到容器
    this.element.appendChild(this.canvas);
    this.element.appendChild(this.fallback);
  }

  private setupEventListeners() {
    // 監聽窗口大小變化
    window.addEventListener('resize', () => this.updateDimensions());

    // 使用 ResizeObserver 監聽容器大小變化
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => this.updateDimensions());
      this.resizeObserver.observe(this.element);
    }

    // 動畫控制
    if (this.options.animated && this.options.liquid) {
      this.animate();
    }
  }

  private updateDimensions() {
    const rect = this.element.getBoundingClientRect();
    this.dimensions = { width: rect.width, height: rect.height };
    
    if (this.dimensions.width > 0 && this.dimensions.height > 0) {
      this.drawGlassText();
    }
  }

  // 計算字體大小
  private getFontSize(): number {
    const sizeMap = {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
    };
    return sizeMap[this.options.size] || 16;
  }

  // 計算字體重量
  private getFontWeight(): number {
    const weightMap = {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    };
    return weightMap[this.options.weight] || 400;
  }

  // 計算玻璃效果參數
  private getGlassParams() {
    const glassMap = {
      light: { opacity: 0.15, blur: 15, saturation: 150, brightness: 1.3, contrast: 1.2 },
      medium: { opacity: 0.25, blur: 25, saturation: 200, brightness: 1.4, contrast: 1.3 },
      heavy: { opacity: 0.35, blur: 35, saturation: 250, brightness: 1.5, contrast: 1.4 },
    };
    return glassMap[this.options.glass] || glassMap.medium;
  }

  // 測量文字尺寸
  private measureText(text: string, font: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return { width: 0, height: 0 };

    ctx.font = font;
    const metrics = ctx.measureText(text);
    const width = metrics.width;
    
    const ascent = metrics.actualBoundingBoxAscent || metrics.fontBoundingBoxAscent || 0;
    const descent = metrics.actualBoundingBoxDescent || metrics.fontBoundingBoxDescent || 0;
    const height = ascent + descent;
    
    const fontSize = this.getFontSize();
    const extraPadding = fontSize * 0.3;
    
    return { width, height: height + extraPadding };
  }

  // 繪製高級毛玻璃文字
  private drawGlassText() {
    if (!this.canvas || !this.element || !this.options.children) return;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = this.getFontSize();
    const fontWeight = this.getFontWeight();
    const font = `${fontWeight} ${fontSize}px ${this.options.fontFamily}`;
    const glassParams = this.getGlassParams();

    // 測量文字
    const textMetrics = this.measureText(this.options.children, font);
    const textWidth = textMetrics.width;
    const textHeight = textMetrics.height;
    
    // 設置畫布尺寸
    const rect = this.element.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    
    const minHeight = Math.max(rect.height, textHeight + 40);

    this.canvas.width = width * dpr;
    this.canvas.height = minHeight * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${minHeight}px`;
    ctx.scale(dpr, dpr);

    // 計算文字位置
    let x = 0;
    let y = minHeight / 2;

    switch (this.options.textAlign) {
      case 'center':
        x = width / 2 - textWidth / 2;
        break;
      case 'right':
        x = width - textWidth;
        break;
      case 'justify':
        x = 0;
        break;
      default:
        x = 0;
    }

    // 清除畫布
    ctx.clearRect(0, 0, width, minHeight);

    // 創建多層毛玻璃效果
    const layers = 4;
    for (let layer = 0; layer < layers; layer++) {
      const layerAlpha = 0.4 - (layer * 0.08);
      const layerBlur = glassParams.blur + (layer * 3);
      
      // 設置字體
      ctx.font = font;
      ctx.textAlign = this.options.textAlign as CanvasTextAlign;
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = `${this.options.letterSpacing}px`;

      // 創建複雜的漸變效果
      const gradientObj = ctx.createLinearGradient(
        x - textWidth * 0.2, 
        y - textHeight * 0.6, 
        x + textWidth * 1.2, 
        y + textHeight * 0.6
      );
      
      // 根據玻璃強度調整漸變
      const baseOpacity = glassParams.opacity * (1 - layer * 0.2);
      const gradientStops = [
        { pos: 0, alpha: baseOpacity * 0.9 },
        { pos: 0.2, alpha: baseOpacity * 0.7 },
        { pos: 0.4, alpha: baseOpacity * 0.5 },
        { pos: 0.6, alpha: baseOpacity * 0.6 },
        { pos: 0.8, alpha: baseOpacity * 0.8 },
        { pos: 1, alpha: baseOpacity * 0.9 }
      ];
      
      gradientStops.forEach(stop => {
        gradientObj.addColorStop(stop.pos, `rgba(255, 255, 255, ${stop.alpha})`);
      });
      
      ctx.fillStyle = gradientObj;

      // 繪製多層陰影（深度效果）
      if (layer === 0) {
        if (this.options.glow) {
          // 發光效果
          ctx.shadowColor = this.options.glowColor;
          ctx.shadowBlur = this.options.glowIntensity * 40;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        } else {
          // 外層深陰影
          ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
          ctx.shadowBlur = 12;
          ctx.shadowOffsetX = 4;
          ctx.shadowOffsetY = 4;
        }
      } else if (layer === 1) {
        // 中層陰影
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
      } else if (layer === 2) {
        // 內層陰影
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
      } else {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // 繪製文字
      ctx.fillText(this.options.children, x, y);

      // 重置陰影
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // 應用高級毛玻璃效果
    const imageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] || 0;
      const g = data[i + 1] || 0;
      const b = data[i + 2] || 0;
      const a = data[i + 3] || 0;

      if (a > 0) {
        const intensity = a / 255;
        
        // 應用強烈的亮度調整
        data[i] = Math.min(255, r * this.options.brightness * 1.4);
        data[i + 1] = Math.min(255, g * this.options.brightness * 1.4);
        data[i + 2] = Math.min(255, b * this.options.brightness * 1.4);

        // 應用對比度調整
        data[i] = Math.min(255, (data[i]! - 128) * this.options.contrast + 128);
        data[i + 1] = Math.min(255, (data[i + 1]! - 128) * this.options.contrast + 128);
        data[i + 2] = Math.min(255, (data[i + 2]! - 128) * this.options.contrast + 128);

        // 應用飽和度調整
        const gray = (data[i]! + data[i + 1]! + data[i + 2]!) / 3;
        data[i] = Math.min(255, gray + (data[i]! - gray) * (this.options.saturation / 100));
        data[i + 1] = Math.min(255, gray + (data[i + 1]! - gray) * (this.options.saturation / 100));
        data[i + 2] = Math.min(255, gray + (data[i + 2]! - gray) * (this.options.saturation / 100));

        // 創建玻璃透明度效果
        const glassOpacity = Math.min(255, a * (0.6 + intensity * 0.4));
        data[i + 3] = glassOpacity;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // 應用最終模糊效果
    ctx.filter = `blur(${glassParams.blur * 0.3}px) saturate(${glassParams.saturation}%) brightness(${glassParams.brightness}) contrast(${glassParams.contrast})`;
    ctx.globalAlpha = 0.95;
    ctx.drawImage(this.canvas, 0, 0);

    // 重置濾鏡
    ctx.filter = 'none';
    ctx.globalAlpha = 1;

    this.isLoaded = true;
    this.updateElementClasses();
  }

  // 動畫循環
  private animate() {
    if (this.options.animated && this.options.liquid) {
      this.drawGlassText();
      this.animationRef = requestAnimationFrame(() => this.animate());
    }
  }

  // 組件類名
  private getComponentClasses(): string {
    return [
      'gh-typography',
      `gh-typography-${this.options.variant}`,
      `gh-typography-${this.options.size}`,
      `gh-typography-${this.options.weight}`,
      `gh-glass-${this.options.glass}`,
      this.options.liquid ? 'gh-liquid-flow' : '',
      this.options.gradient ? 'gh-gradient' : '',
      this.options.animated ? 'gh-animated' : '',
      this.options.glow ? 'gh-glow' : '',
      this.isLoaded ? 'gh-loaded' : '',
      this.options.className,
    ].filter(Boolean).join(' ');
  }

  // 更新元素類名
  private updateElementClasses() {
    this.element.className = this.getComponentClasses();
  }

  // 容器樣式
  private getContainerStyle(): string {
    const style = {
      ...this.options.style,
      fontFamily: this.options.fontFamily,
      letterSpacing: `${this.options.letterSpacing}px`,
      lineHeight: this.options.lineHeight,
      textAlign: this.options.textAlign,
      position: 'relative',
      display: 'inline-block',
      minHeight: Math.max(this.getFontSize() * this.options.lineHeight, this.getFontSize() + 30),
      padding: '15px 0',
    };

    return Object.entries(style)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  }

  // Canvas 樣式
  private getCanvasStyle(): string {
    const style = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '1',
    };

    return Object.entries(style)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  }

  // Fallback 樣式
  private getFallbackStyle(): string {
    const style = {
      opacity: this.isLoaded ? '0' : '1',
      position: 'relative',
      zIndex: '2',
      fontFamily: this.options.fontFamily,
      fontSize: `${this.getFontSize()}px`,
      fontWeight: this.getFontWeight(),
      letterSpacing: `${this.options.letterSpacing}px`,
      lineHeight: this.options.lineHeight,
      textAlign: this.options.textAlign,
      color: 'transparent',
    };

    return Object.entries(style)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  }

  // 更新選項
  updateOptions(newOptions: Partial<GlassTypographyOptions>) {
    this.options = { ...this.options, ...newOptions };
    this.element.className = this.getComponentClasses();
    this.element.style.cssText = this.getContainerStyle();
    this.fallback.style.cssText = this.getFallbackStyle();
    this.fallback.textContent = this.options.children;
    
    if (this.options.animated && this.options.liquid) {
      this.animate();
    } else if (this.animationRef) {
      cancelAnimationFrame(this.animationRef);
    }
    
    this.drawGlassText();
  }

  // 銷毀
  destroy() {
    if (this.animationRef) {
      cancelAnimationFrame(this.animationRef);
    }
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    window.removeEventListener('resize', () => this.updateDimensions());
    
    // 清理 DOM
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    if (this.fallback.parentNode) {
      this.fallback.parentNode.removeChild(this.fallback);
    }
  }
}

// 工廠函數
export function createGlassTypography(container: HTMLElement, options: GlassTypographyOptions): GlassTypography {
  return new GlassTypography(container, options);
}

// 默認導出
export default GlassTypography;
