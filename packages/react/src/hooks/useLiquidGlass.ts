import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { getDisplacementFilter } from '../components/LiquidGlassElement/getDisplacementFilter';

export interface LiquidGlassOptions {
  depth?: number;
  strength?: number;
  chromaticAberration?: number;
  blur?: number;
}

export interface LiquidGlassState {
  clicked: boolean;
  hovered: boolean;
  depth: number;
}

export const useLiquidGlass = (options: LiquidGlassOptions) => {
  const {
    depth: baseDepth = 8,
    strength = 100,
    chromaticAberration = 0,
    blur = 2,
  } = options;

  const [state, setState] = useState<LiquidGlassState>({
    clicked: false,
    hovered: false,
    depth: baseDepth,
  });

  const [dimensions, setDimensions] = useState({ width: 0, height: 0, radius: 0 });
  const elementRef = useRef<HTMLElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate dynamic depth based on interaction state
  const currentDepth = state.clicked ? baseDepth / 0.7 : baseDepth;

  // Get element dimensions dynamically
  useEffect(() => {
    const updateDimensions = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(elementRef.current);
        const borderRadius = parseFloat(computedStyle.borderRadius) || 0;
        
        // 確保獲取精確的像素值
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);
        
        setDimensions({
          width,
          height,
          radius: borderRadius,
        });
      }
    };

    // 使用 requestAnimationFrame 確保在下一幀更新
    const updateWithRAF = () => {
      requestAnimationFrame(updateDimensions);
    };

    updateWithRAF();
    window.addEventListener('resize', updateWithRAF);
    
    return () => window.removeEventListener('resize', updateWithRAF);
  }, []);

  // 快取位移過濾器 URL，只在必要時重新計算
  const displacementFilterUrl = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) {
      return '';
    }
    
    return getDisplacementFilter({
      width: dimensions.width,
      height: dimensions.height,
      radius: dimensions.radius,
      depth: currentDepth,
      strength,
      chromaticAberration,
    });
  }, [dimensions.width, dimensions.height, dimensions.radius, currentDepth, strength, chromaticAberration]);

  // 快取背景過濾器 CSS，避免重複計算
  const backdropFilter = useMemo(() => {
    if (!displacementFilterUrl) {
      return `blur(${blur / 2}px) brightness(1.1) saturate(1.5)`;
    }
    
    return `blur(${blur / 2}px) url('${displacementFilterUrl}') blur(${blur}px) brightness(1.1) saturate(1.5)`;
  }, [displacementFilterUrl, blur]);

  // 優化事件處理器，減少不必要的狀態更新
  const handleMouseDown = useCallback(() => {
    setState(prev => prev.clicked ? prev : { ...prev, clicked: true });
  }, []);

  const handleMouseUp = useCallback(() => {
    setState(prev => !prev.clicked ? prev : { ...prev, clicked: false });
  }, []);

  // 使用防抖優化 hover 事件
  const handleMouseEnter = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      setState(prev => prev.hovered ? prev : { ...prev, hovered: true });
    }, 16); // 約 60fps
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }
    
    setState(prev => (!prev.hovered && !prev.clicked) ? prev : { ...prev, hovered: false, clicked: false });
  }, []);

  // 快取 CSS 樣式，避免重複創建對象
  const liquidGlassStyle = useMemo((): React.CSSProperties => {
    return {
      backdropFilter,
    };
  }, [backdropFilter]);

  // 保持向後兼容性
  const getLiquidGlassStyle = useCallback((): React.CSSProperties => {
    return liquidGlassStyle;
  }, [liquidGlassStyle]);

  // Update element ref when it changes
  useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        
        // 清理防抖定時器
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
          debounceTimeoutRef.current = null;
        }
      };
    }
  }, [handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

  return {
    elementRef,
    state,
    getLiquidGlassStyle,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
  };
};

