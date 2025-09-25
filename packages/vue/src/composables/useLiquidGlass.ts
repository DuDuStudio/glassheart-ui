import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue';
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

export const useLiquidGlass = (options: LiquidGlassOptions = {}) => {
  const {
    depth: baseDepth = 8,
    strength = 100,
    chromaticAberration = 0,
    blur = 2,
  } = options;

  const state = reactive<LiquidGlassState>({
    clicked: false,
    hovered: false,
    depth: baseDepth,
  });

  const dimensions = ref({ width: 0, height: 0, radius: 0 });
  const elementRef = ref<HTMLElement | null>(null);
  const debounceTimeoutRef = ref<number | null>(null);

  // Calculate dynamic depth based on interaction state
  const currentDepth = computed(() => state.clicked ? baseDepth / 0.7 : baseDepth);

  // Get element dimensions dynamically with performance optimization
  const updateDimensions = () => {
    if (elementRef.value) {
      const rect = elementRef.value.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(elementRef.value);
      const borderRadius = parseFloat(computedStyle.borderRadius) || 0;
      
      // 確保獲取精確的像素值
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      
      dimensions.value = {
        width,
        height,
        radius: borderRadius,
      };
    }
  };

  // 使用 requestAnimationFrame 優化尺寸更新
  const updateWithRAF = () => {
    requestAnimationFrame(updateDimensions);
  };

  // Generate displacement filter URL with caching
  const displacementFilterUrl = computed(() => {
    if (dimensions.value.width === 0 || dimensions.value.height === 0) {
      return '';
    }
    
    return getDisplacementFilter({
      width: dimensions.value.width,
      height: dimensions.value.height,
      radius: dimensions.value.radius,
      depth: currentDepth.value,
      strength,
      chromaticAberration,
    });
  });

  // Generate backdrop filter CSS with caching
  const backdropFilter = computed(() => {
    if (!displacementFilterUrl.value) {
      return `blur(${blur / 2}px) brightness(1.1) saturate(1.5)`;
    }
    
    return `blur(${blur / 2}px) url('${displacementFilterUrl.value}') blur(${blur}px) brightness(1.1) saturate(1.5)`;
  });

  // 優化事件處理器，減少不必要的狀態更新
  const handleMouseDown = () => {
    if (!state.clicked) {
      state.clicked = true;
    }
  };

  const handleMouseUp = () => {
    if (state.clicked) {
      state.clicked = false;
    }
  };

  // 使用防抖優化 hover 事件
  const handleMouseEnter = () => {
    if (debounceTimeoutRef.value) {
      clearTimeout(debounceTimeoutRef.value);
    }
    
    debounceTimeoutRef.value = window.setTimeout(() => {
      if (!state.hovered) {
        state.hovered = true;
      }
    }, 16); // 約 60fps
  };

  const handleMouseLeave = () => {
    if (debounceTimeoutRef.value) {
      clearTimeout(debounceTimeoutRef.value);
      debounceTimeoutRef.value = null;
    }
    
    if (state.hovered || state.clicked) {
      state.hovered = false;
      state.clicked = false;
    }
  };

  // Generate CSS properties for the element
  const getLiquidGlassStyle = () => ({
    backdropFilter: backdropFilter.value,
  });

  // Setup event listeners
  onMounted(() => {
    updateWithRAF();
    window.addEventListener('resize', updateWithRAF);
    
    if (elementRef.value) {
      const element = elementRef.value;
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWithRAF);
    
    // 清理防抖定時器
    if (debounceTimeoutRef.value) {
      clearTimeout(debounceTimeoutRef.value);
      debounceTimeoutRef.value = null;
    }
    
    if (elementRef.value) {
      const element = elementRef.value;
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    }
  });

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
