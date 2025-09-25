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

export interface Dimensions {
  width: number;
  height: number;
  radius: number;
}

export interface LiquidGlassHook {
  elementRef: HTMLElement | null;
  state: LiquidGlassState;
  dimensions: Dimensions;
  getLiquidGlassStyle: () => { backdropFilter: string };
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  cleanup: () => void;
}

export const useLiquidGlass = (options: LiquidGlassOptions = {}): LiquidGlassHook => {
  const {
    depth: baseDepth = 8,
    strength = 100,
    chromaticAberration = 0,
    blur = 2,
  } = options;

  let elementRef: HTMLElement | null = null;
  let state: LiquidGlassState = {
    clicked: false,
    hovered: false,
    depth: baseDepth,
  };

  let dimensions: Dimensions = { width: 0, height: 0, radius: 0 };
  let debounceTimeout: number | null = null;
  let lastStyle: string | null = null;

  // 優化事件處理器，減少不必要的狀態更新
  const handleMouseDown = () => {
    if (!state.clicked) {
      state.clicked = true;
      updateStyle();
    }
  };

  const handleMouseUp = () => {
    if (state.clicked) {
      state.clicked = false;
      updateStyle();
    }
  };

  // 使用防抖優化 hover 事件
  const handleMouseEnter = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    debounceTimeout = window.setTimeout(() => {
      if (!state.hovered) {
        state.hovered = true;
      }
    }, 16); // 約 60fps
  };

  const handleMouseLeave = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
      debounceTimeout = null;
    }
    
    if (state.hovered || state.clicked) {
      state.hovered = false;
      state.clicked = false;
      updateStyle();
    }
  };

  const updateDimensions = () => {
    if (elementRef) {
      const rect = elementRef.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(elementRef);
      const borderRadius = parseFloat(computedStyle.borderRadius) || 0;
      
      // 確保獲取精確的像素值
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      
      dimensions = {
        width,
        height,
        radius: borderRadius,
      };
      
      updateStyle();
    }
  };

  // 使用 requestAnimationFrame 優化尺寸更新
  const updateWithRAF = () => {
    requestAnimationFrame(updateDimensions);
  };

  const updateStyle = () => {
    if (elementRef) {
      const currentDepth = state.clicked ? baseDepth / 0.7 : baseDepth;
      
      if (dimensions.width === 0 || dimensions.height === 0) {
        const backdropFilter = `blur(${blur / 2}px) brightness(1.1) saturate(1.5)`;
        if (lastStyle !== backdropFilter) {
          elementRef.style.backdropFilter = backdropFilter;
          lastStyle = backdropFilter;
        }
        return;
      }
      
      const displacementFilterUrl = getDisplacementFilter({
        width: dimensions.width,
        height: dimensions.height,
        radius: dimensions.radius,
        depth: currentDepth,
        strength,
        chromaticAberration,
      });

      const backdropFilter = `blur(${blur / 2}px) url('${displacementFilterUrl}') blur(${blur}px) brightness(1.1) saturate(1.5)`;
      
      // 只在樣式真正改變時才更新
      if (lastStyle !== backdropFilter) {
        elementRef.style.backdropFilter = backdropFilter;
        lastStyle = backdropFilter;
      }
    }
  };

  const getLiquidGlassStyle = () => {
    const currentDepth = state.clicked ? baseDepth / 0.7 : baseDepth;
    
    const displacementFilterUrl = getDisplacementFilter({
      width: dimensions.width,
      height: dimensions.height,
      radius: dimensions.radius,
      depth: currentDepth,
      strength,
      chromaticAberration,
    });

    const backdropFilter = `blur(${blur / 2}px) url('${displacementFilterUrl}') blur(${blur}px) brightness(1.1) saturate(1.5)`;
    
    return { backdropFilter };
  };

  const setupEventListeners = (element: HTMLElement) => {
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', updateWithRAF);
  };

  const cleanup = () => {
    // 清理防抖定時器
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
      debounceTimeout = null;
    }
    
    if (elementRef) {
      elementRef.removeEventListener('mousedown', handleMouseDown);
      elementRef.removeEventListener('mouseup', handleMouseUp);
      elementRef.removeEventListener('mouseenter', handleMouseEnter);
      elementRef.removeEventListener('mouseleave', handleMouseLeave);
    }
    window.removeEventListener('resize', updateWithRAF);
  };

  // Set element ref and setup listeners
  const setElementRef = (element: HTMLElement) => {
    elementRef = element;
    setupEventListeners(element);
    updateWithRAF();
  };

  return {
    get elementRef() { return elementRef; },
    set elementRef(element: HTMLElement | null) {
      if (element) {
        setElementRef(element);
      }
    },
    state,
    dimensions,
    getLiquidGlassStyle,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
    cleanup,
  };
};
