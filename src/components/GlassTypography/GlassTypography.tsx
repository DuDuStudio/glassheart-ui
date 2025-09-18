import React, { useEffect, useRef, useState, useCallback } from 'react';
import './GlassTypography.css';

export interface GlassTypographyProps {
  children: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  glass?: 'light' | 'medium' | 'heavy';
  liquid?: boolean;
  gradient?: boolean;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
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

export const GlassTypography: React.FC<GlassTypographyProps> = ({
  children,
  variant = 'p',
  size = 'md',
  weight = 'normal',
  glass = 'medium',
  liquid = false,
  gradient = false,
  animated = false,
  className = '',
  style = {},
  fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  letterSpacing = 0,
  lineHeight = 1.2,
  textAlign = 'left',
  textShadow = true,
  glow = false,
  glowColor = '#ffffff',
  glowIntensity = 0.8,
  blur = 20,
  opacity = 0.2,
  saturation = 180,
  brightness = 1.2,
  contrast = 1.1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number>();

  // 計算字體大小
  const getFontSize = useCallback(() => {
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
    return sizeMap[size] || 16;
  }, [size]);

  // 計算字體重量
  const getFontWeight = useCallback(() => {
    const weightMap = {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    };
    return weightMap[weight] || 400;
  }, [weight]);

  // 計算玻璃效果參數
  const getGlassParams = useCallback(() => {
    const glassMap = {
      light: { opacity: 0.15, blur: 15, saturation: 150, brightness: 1.3, contrast: 1.2 },
      medium: { opacity: 0.25, blur: 25, saturation: 200, brightness: 1.4, contrast: 1.3 },
      heavy: { opacity: 0.35, blur: 35, saturation: 250, brightness: 1.5, contrast: 1.4 },
    };
    return glassMap[glass] || glassMap.medium;
  }, [glass]);

  // 測量文字尺寸
  const measureText = useCallback((text: string, font: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return { width: 0, height: 0 };

    ctx.font = font;
    const metrics = ctx.measureText(text);
    const width = metrics.width;
    
    // 更準確的高度計算，包含所有可能的文字部分
    const ascent = metrics.actualBoundingBoxAscent || metrics.fontBoundingBoxAscent || 0;
    const descent = metrics.actualBoundingBoxDescent || metrics.fontBoundingBoxDescent || 0;
    const height = ascent + descent;
    
    // 添加額外的邊距以防止裁切
    const fontSize = getFontSize();
    const extraPadding = fontSize * 0.3; // 增加邊距
    
    return { width, height: height + extraPadding };
  }, [getFontSize]);

  // 繪製高級毛玻璃文字
  const drawGlassText = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !children) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = getFontSize();
    const fontWeight = getFontWeight();
    const font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const glassParams = getGlassParams();

    // 測量文字
    const textMetrics = measureText(children, font);
    const textWidth = textMetrics.width;
    const textHeight = textMetrics.height;
    
    // 設置畫布尺寸
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    
    // 使用測量到的文字高度，確保有足夠空間
    const minHeight = Math.max(rect.height, textHeight + 40);

    canvas.width = width * dpr;
    canvas.height = minHeight * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${minHeight}px`;
    ctx.scale(dpr, dpr);

    // 計算文字位置
    let x = 0;
    let y = minHeight / 2;

    switch (textAlign) {
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

    // 如果啟用發光效果，先繪製多層發光
    if (glow) {
      const glowLayers = 5;
      for (let i = 0; i < glowLayers; i++) {
        ctx.save();
        ctx.font = font;
        ctx.textAlign = textAlign as CanvasTextAlign;
        ctx.textBaseline = 'middle';
        ctx.letterSpacing = `${letterSpacing}px`;
        
        // 設置發光效果
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowIntensity * 20 * (glowLayers - i);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // 設置發光顏色
        const glowAlpha = 0.3 * (glowLayers - i) / glowLayers;
        ctx.fillStyle = `rgba(255, 255, 255, ${glowAlpha})`;
        
        // 繪製發光文字
        ctx.fillText(children, x, y);
        ctx.restore();
      }
    }

    // 創建多層毛玻璃效果
    const layers = 4;
    for (let layer = 0; layer < layers; layer++) {
      const layerAlpha = 0.4 - (layer * 0.08);
      const layerBlur = glassParams.blur + (layer * 3);
      
      // 設置字體
      ctx.font = font;
      ctx.textAlign = textAlign as CanvasTextAlign;
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = `${letterSpacing}px`;

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
        if (!glow) {
          // 外層深陰影（只有在沒有發光時才繪製）
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
      ctx.fillText(children, x, y);

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
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a > 0) {
        // 創建更真實的玻璃效果
        const intensity = a / 255;
        
        // 應用強烈的亮度調整
        data[i] = Math.min(255, r * brightness * 1.4);
        data[i + 1] = Math.min(255, g * brightness * 1.4);
        data[i + 2] = Math.min(255, b * brightness * 1.4);

        // 應用對比度調整
        data[i] = Math.min(255, (data[i] - 128) * contrast + 128);
        data[i + 1] = Math.min(255, (data[i + 1] - 128) * contrast + 128);
        data[i + 2] = Math.min(255, (data[i + 2] - 128) * contrast + 128);

        // 應用飽和度調整
        const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = Math.min(255, gray + (data[i] - gray) * (saturation / 100));
        data[i + 1] = Math.min(255, gray + (data[i + 1] - gray) * (saturation / 100));
        data[i + 2] = Math.min(255, gray + (data[i + 2] - gray) * (saturation / 100));

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

    setIsLoaded(true);
  }, [
    children,
    getFontSize,
    getFontWeight,
    getGlassParams,
    measureText,
    fontFamily,
    letterSpacing,
    textAlign,
    textShadow,
    glow,
    glowColor,
    glowIntensity,
    gradient,
    brightness,
    contrast,
    saturation,
  ]);

  // 動畫循環
  const animate = useCallback(() => {
    if (animated && liquid) {
      drawGlassText();
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [animated, liquid, drawGlassText]);

  // 初始化
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // 繪製文字
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      drawGlassText();
    }
  }, [dimensions, drawGlassText]);

  // 動畫控制
  useEffect(() => {
    if (animated && liquid) {
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animated, liquid, animate]);

  // 組件類名
  const componentClasses = [
    'gh-typography',
    `gh-typography-${variant}`,
    `gh-typography-${size}`,
    `gh-typography-${weight}`,
    `gh-glass-${glass}`,
    liquid ? 'gh-liquid-flow' : '',
    gradient ? 'gh-gradient' : '',
    animated ? 'gh-animated' : '',
    glow ? 'gh-glow' : '',
    isLoaded ? 'gh-loaded' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={componentClasses}
      style={{
        ...style,
        fontFamily,
        letterSpacing: `${letterSpacing}px`,
        lineHeight,
        textAlign,
        position: 'relative',
        display: 'inline-block',
        minHeight: Math.max(getFontSize() * lineHeight, getFontSize() + 30),
        padding: '15px 0',
      }}
    >
      <canvas
        ref={canvasRef}
        className="gh-typography-canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        className="gh-typography-fallback"
        style={{
          opacity: isLoaded ? 0 : 1,
          position: 'relative',
          zIndex: 2,
          fontFamily,
          fontSize: `${getFontSize()}px`,
          fontWeight: getFontWeight(),
          letterSpacing: `${letterSpacing}px`,
          lineHeight,
          textAlign,
          color: 'transparent',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GlassTypography;