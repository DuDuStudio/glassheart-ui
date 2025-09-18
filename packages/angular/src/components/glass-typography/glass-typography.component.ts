import { Component, Input, ElementRef, ViewChild, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gh-glass-typography',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #containerRef
      [class]="componentClasses"
      [style]="containerStyle"
    >
      <canvas
        #canvasRef
        class="gh-typography-canvas"
        [style]="canvasStyle"
      ></canvas>
      <div
        class="gh-typography-fallback"
        [style]="fallbackStyle"
      >
        {{ children }}
      </div>
    </div>
  `,
  styleUrls: ['./glass-typography.component.css']
})
export class GlassTypographyComponent implements OnInit, OnDestroy {
  @Input() children: string = '';
  @Input() variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' = 'p';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' = 'md';
  @Input() weight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black' = 'normal';
  @Input() glass: 'light' | 'medium' | 'heavy' = 'medium';
  @Input() liquid: boolean = false;
  @Input() gradient: boolean = false;
  @Input() animated: boolean = false;
  @Input() className: string = '';
  @Input() style: Record<string, any> = {};
  @Input() fontFamily: string = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  @Input() letterSpacing: number = 0;
  @Input() lineHeight: number = 1.2;
  @Input() textAlign: 'left' | 'center' | 'right' | 'justify' = 'left';
  @Input() textShadow: boolean = true;
  @Input() glow: boolean = false;
  @Input() glowColor: string = '#ffffff';
  @Input() glowIntensity: number = 0.8;
  @Input() blur: number = 20;
  @Input() opacity: number = 0.2;
  @Input() saturation: number = 180;
  @Input() brightness: number = 1.2;
  @Input() contrast: number = 1.1;

  @ViewChild('canvasRef', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('containerRef', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  isLoaded = false;
  dimensions = { width: 0, height: 0 };
  animationRef?: number;

  constructor(private ngZone: NgZone) {}

  // 計算字體大小
  getFontSize(): number {
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
    return sizeMap[this.size] || 16;
  }

  // 計算字體重量
  getFontWeight(): number {
    const weightMap = {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    };
    return weightMap[this.weight] || 400;
  }

  // 計算玻璃效果參數
  getGlassParams() {
    const glassMap = {
      light: { opacity: 0.15, blur: 15, saturation: 150, brightness: 1.3, contrast: 1.2 },
      medium: { opacity: 0.25, blur: 25, saturation: 200, brightness: 1.4, contrast: 1.3 },
      heavy: { opacity: 0.35, blur: 35, saturation: 250, brightness: 1.5, contrast: 1.4 },
    };
    return glassMap[this.glass] || glassMap.medium;
  }

  // 測量文字尺寸
  measureText(text: string, font: string) {
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
  drawGlassText() {
    const canvas = this.canvasRef?.nativeElement;
    const container = this.containerRef?.nativeElement;
    if (!canvas || !container || !this.children) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = this.getFontSize();
    const fontWeight = this.getFontWeight();
    const font = `${fontWeight} ${fontSize}px ${this.fontFamily}`;
    const glassParams = this.getGlassParams();

    // 測量文字
    const textMetrics = this.measureText(this.children, font);
    const textWidth = textMetrics.width;
    const textHeight = textMetrics.height;
    
    // 設置畫布尺寸
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    
    const minHeight = Math.max(rect.height, textHeight + 40);

    canvas.width = width * dpr;
    canvas.height = minHeight * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${minHeight}px`;
    ctx.scale(dpr, dpr);

    // 計算文字位置
    let x = 0;
    let y = minHeight / 2;

    switch (this.textAlign) {
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
      ctx.textAlign = this.textAlign as CanvasTextAlign;
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = `${this.letterSpacing}px`;

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
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
      } else if (layer === 1) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
      } else if (layer === 2) {
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

      // 繪製發光效果
      if (this.glow && layer === 0) {
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = this.glowIntensity * 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // 繪製文字
      ctx.fillText(this.children, x, y);

      // 重置陰影
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // 應用高級毛玻璃效果
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] || 0;
      const g = data[i + 1] || 0;
      const b = data[i + 2] || 0;
      const a = data[i + 3] || 0;

      if (a > 0) {
        const intensity = a / 255;
        
        // 應用強烈的亮度調整
        data[i] = Math.min(255, r * this.brightness * 1.4);
        data[i + 1] = Math.min(255, g * this.brightness * 1.4);
        data[i + 2] = Math.min(255, b * this.brightness * 1.4);

        // 應用對比度調整
        data[i] = Math.min(255, (data[i]! - 128) * this.contrast + 128);
        data[i + 1] = Math.min(255, (data[i + 1]! - 128) * this.contrast + 128);
        data[i + 2] = Math.min(255, (data[i + 2]! - 128) * this.contrast + 128);

        // 應用飽和度調整
        const gray = (data[i]! + data[i + 1]! + data[i + 2]!) / 3;
        data[i] = Math.min(255, gray + (data[i]! - gray) * (this.saturation / 100));
        data[i + 1] = Math.min(255, gray + (data[i + 1]! - gray) * (this.saturation / 100));
        data[i + 2] = Math.min(255, gray + (data[i + 2]! - gray) * (this.saturation / 100));

        // 創建玻璃透明度效果
        const glassOpacity = Math.min(255, a * (0.6 + intensity * 0.4));
        data[i + 3] = glassOpacity;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // 應用最終模糊效果
    ctx.filter = `blur(${glassParams.blur * 0.3}px) saturate(${glassParams.saturation}%) brightness(${glassParams.brightness}) contrast(${glassParams.contrast})`;
    ctx.globalAlpha = 0.95;
    ctx.drawImage(canvas, 0, 0);

    // 重置濾鏡
    ctx.filter = 'none';
    ctx.globalAlpha = 1;

    this.isLoaded = true;
  }

  // 動畫循環
  animate() {
    if (this.animated && this.liquid) {
      this.drawGlassText();
      this.animationRef = requestAnimationFrame(() => this.animate());
    }
  }

  // 更新尺寸
  updateDimensions() {
    if (this.containerRef?.nativeElement) {
      const rect = this.containerRef.nativeElement.getBoundingClientRect();
      this.dimensions = { width: rect.width, height: rect.height };
    }
  }

  // 組件類名
  get componentClasses(): string {
    return [
      'gh-typography',
      `gh-typography-${this.variant}`,
      `gh-typography-${this.size}`,
      `gh-typography-${this.weight}`,
      `gh-glass-${this.glass}`,
      this.liquid ? 'gh-liquid-flow' : '',
      this.gradient ? 'gh-gradient' : '',
      this.animated ? 'gh-animated' : '',
      this.glow ? 'gh-glow' : '',
      this.isLoaded ? 'gh-loaded' : '',
      this.className,
    ].filter(Boolean).join(' ');
  }

  // 容器樣式
  get containerStyle(): Record<string, any> {
    return {
      ...this.style,
      fontFamily: this.fontFamily,
      letterSpacing: `${this.letterSpacing}px`,
      lineHeight: this.lineHeight,
      textAlign: this.textAlign,
      position: 'relative',
      display: 'inline-block',
      minHeight: Math.max(this.getFontSize() * this.lineHeight, this.getFontSize() + 30),
      padding: '15px 0',
    };
  }

  // Canvas 樣式
  get canvasStyle(): Record<string, any> {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
    };
  }

  // Fallback 樣式
  get fallbackStyle(): Record<string, any> {
    return {
      opacity: this.isLoaded ? 0 : 1,
      position: 'relative',
      zIndex: 2,
      fontFamily: this.fontFamily,
      fontSize: `${this.getFontSize()}px`,
      fontWeight: this.getFontWeight(),
      letterSpacing: `${this.letterSpacing}px`,
      lineHeight: this.lineHeight,
      textAlign: this.textAlign,
      color: 'transparent',
    };
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.updateDimensions();
      window.addEventListener('resize', () => this.updateDimensions());
      
      if (this.dimensions.width > 0 && this.dimensions.height > 0) {
        this.drawGlassText();
      }
    });
  }

  ngOnDestroy() {
    if (this.animationRef) {
      cancelAnimationFrame(this.animationRef);
    }
    window.removeEventListener('resize', () => this.updateDimensions());
  }
}
