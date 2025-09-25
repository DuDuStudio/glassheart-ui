import { writable, derived } from 'svelte/store';
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

export const useLiquidGlass = (options: LiquidGlassOptions = {}) => {
  const {
    depth: baseDepth = 8,
    strength = 100,
    chromaticAberration = 0,
    blur = 2,
  } = options;

  const state = writable<LiquidGlassState>({
    clicked: false,
    hovered: false,
    depth: baseDepth,
  });

  const dimensions = writable<Dimensions>({ width: 0, height: 0, radius: 0 });
  const elementRef = writable<HTMLElement | null>(null);
  let debounceTimeout: number | null = null;

  // Calculate dynamic depth based on interaction state
  const currentDepth = derived(state, ($state) => 
    $state.clicked ? baseDepth / 0.7 : baseDepth
  );

  // Generate displacement filter URL with caching
  const displacementFilterUrl = derived(
    [dimensions, currentDepth],
    ([$dimensions, $currentDepth]) => {
      if ($dimensions.width === 0 || $dimensions.height === 0) {
        return '';
      }
      
      return getDisplacementFilter({
        width: $dimensions.width,
        height: $dimensions.height,
        radius: $dimensions.radius,
        depth: $currentDepth,
        strength,
        chromaticAberration,
      });
    }
  );

  // Generate backdrop filter CSS with caching
  const backdropFilter = derived(displacementFilterUrl, ($displacementFilterUrl) => {
    if (!$displacementFilterUrl) {
      return `blur(${blur / 2}px) brightness(1.1) saturate(1.5)`;
    }
    
    return `blur(${blur / 2}px) url('${$displacementFilterUrl}') blur(${blur}px) brightness(1.1) saturate(1.5)`;
  });

  // Generate CSS properties for the element
  const liquidGlassStyle = derived(backdropFilter, ($backdropFilter) => ({
    backdropFilter: $backdropFilter,
  }));

  // 優化事件處理器，減少不必要的狀態更新
  const handleMouseDown = () => {
    state.update(s => s.clicked ? s : { ...s, clicked: true });
  };

  const handleMouseUp = () => {
    state.update(s => !s.clicked ? s : { ...s, clicked: false });
  };

  // 使用防抖優化 hover 事件
  const handleMouseEnter = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    debounceTimeout = window.setTimeout(() => {
      state.update(s => s.hovered ? s : { ...s, hovered: true });
    }, 16); // 約 60fps
  };

  const handleMouseLeave = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
      debounceTimeout = null;
    }
    
    state.update(s => (!s.hovered && !s.clicked) ? s : { ...s, hovered: false, clicked: false });
  };

  // Update dimensions with performance optimization
  const updateDimensions = () => {
    elementRef.subscribe(element => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);
        const borderRadius = parseFloat(computedStyle.borderRadius) || 0;
        
        // 確保獲取精確的像素值
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);
        
        dimensions.set({
          width,
          height,
          radius: borderRadius,
        });
      }
    })();
  };

  // 使用 requestAnimationFrame 優化尺寸更新
  const updateWithRAF = () => {
    requestAnimationFrame(updateDimensions);
  };

  // Setup event listeners
  const setupEventListeners = () => {
    elementRef.subscribe(element => {
      if (element) {
        element.addEventListener('mousedown', handleMouseDown);
        element.addEventListener('mouseup', handleMouseUp);
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        
        updateWithRAF();
        window.addEventListener('resize', updateWithRAF);
      }
    })();
  };

  const cleanup = () => {
    // 清理防抖定時器
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
      debounceTimeout = null;
    }
    
    elementRef.subscribe(element => {
      if (element) {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    })();
    window.removeEventListener('resize', updateWithRAF);
  };

  return {
    elementRef,
    state,
    dimensions,
    liquidGlassStyle,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
    setupEventListeners,
    cleanup,
  };
};
