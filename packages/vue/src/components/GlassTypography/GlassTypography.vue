<template>
  <div ref="containerRef" :class="componentClasses" :style="containerStyle">
    <canvas ref="canvasRef" class="gh-typography-canvas" :style="canvasStyle" />
    <div class="gh-typography-fallback" :style="fallbackStyle">{{ children }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import './GlassTypography.css';

const props = defineProps({
  children: { type: String, default: '' },
  variant: { type: String, default: 'p' },
  size: { type: String, default: 'md' },
  weight: { type: String, default: 'normal' },
  glass: { type: String, default: 'medium' },
  liquid: { type: Boolean, default: false },
  gradient: { type: Boolean, default: false },
  animated: { type: Boolean, default: false },
  className: { type: String, default: '' },
  style: { type: Object, default: () => ({}) },
  fontFamily: { type: String, default: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  letterSpacing: { type: Number, default: 0 },
  lineHeight: { type: Number, default: 1.2 },
  textAlign: { type: String, default: 'left' },
  textShadow: { type: Boolean, default: true },
  glow: { type: Boolean, default: false },
  glowColor: { type: String, default: '#ffffff' },
  glowIntensity: { type: Number, default: 0.8 },
  blur: { type: Number, default: 20 },
  opacity: { type: Number, default: 0.2 },
  saturation: { type: Number, default: 180 },
  brightness: { type: Number, default: 1.2 },
  contrast: { type: Number, default: 1.1 }
});

const canvasRef = ref(null);
const containerRef = ref(null);
const isLoaded = ref(false);
const dimensions = ref({ width: 0, height: 0 });
const animationRef = ref(null);

const getFontSize = () => {
  const sizeMap = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 48, '6xl': 60 };
  return sizeMap[props.size] || 16;
};

const getFontWeight = () => {
  const weightMap = { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };
  return weightMap[props.weight] || 400;
};

const getGlassParams = () => {
  const glassMap = {
    light: { opacity: 0.15, blur: 15, saturation: 150, brightness: 1.3, contrast: 1.2 },
    medium: { opacity: 0.25, blur: 25, saturation: 200, brightness: 1.4, contrast: 1.3 },
    heavy: { opacity: 0.35, blur: 35, saturation: 250, brightness: 1.5, contrast: 1.4 }
  };
  return glassMap[props.glass] || glassMap.medium;
};

const measureText = (text, font) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return { width: 0, height: 0 };
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const width = metrics.width;
  const ascent = metrics.actualBoundingBoxAscent || metrics.fontBoundingBoxAscent || 0;
  const descent = metrics.actualBoundingBoxDescent || metrics.fontBoundingBoxDescent || 0;
  const height = ascent + descent;
  const fontSize = getFontSize();
  const extraPadding = fontSize * 0.3;
  return { width, height: height + extraPadding };
};

const drawGlassText = () => {
  const canvas = canvasRef.value;
  const container = containerRef.value;
  if (!canvas || !container || !props.children) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const fontSize = getFontSize();
  const fontWeight = getFontWeight();
  const font = `${fontWeight} ${fontSize}px ${props.fontFamily}`;
  const glassParams = getGlassParams();

  const textMetrics = measureText(props.children, font);
  const textWidth = textMetrics.width;
  const textHeight = textMetrics.height;
  
  const rect = container.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = rect.width;
  const minHeight = Math.max(rect.height, textHeight + 40);

  canvas.width = width * dpr;
  canvas.height = minHeight * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${minHeight}px`;
  ctx.scale(dpr, dpr);

  let x = 0;
  let y = minHeight / 2;

  switch (props.textAlign) {
    case 'center': x = width / 2 - textWidth / 2; break;
    case 'right': x = width - textWidth; break;
    default: x = 0;
  }

  ctx.clearRect(0, 0, width, minHeight);

  const layers = 4;
  for (let layer = 0; layer < layers; layer++) {
    ctx.font = font;
    ctx.textAlign = props.textAlign;
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = `${props.letterSpacing}px`;

    const gradientObj = ctx.createLinearGradient(
      x - textWidth * 0.2, y - textHeight * 0.6, 
      x + textWidth * 1.2, y + textHeight * 0.6
    );
    
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

    if (props.glow && layer === 0) {
      ctx.shadowColor = props.glowColor;
      ctx.shadowBlur = props.glowIntensity * 40;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    ctx.fillText(props.children, x, y);

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] || 0;
    const g = data[i + 1] || 0;
    const b = data[i + 2] || 0;
    const a = data[i + 3] || 0;

    if (a > 0) {
      const intensity = a / 255;
      data[i] = Math.min(255, r * props.brightness * 1.4);
      data[i + 1] = Math.min(255, g * props.brightness * 1.4);
      data[i + 2] = Math.min(255, b * props.brightness * 1.4);
      data[i] = Math.min(255, (data[i] - 128) * props.contrast + 128);
      data[i + 1] = Math.min(255, (data[i + 1] - 128) * props.contrast + 128);
      data[i + 2] = Math.min(255, (data[i + 2] - 128) * props.contrast + 128);
      const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = Math.min(255, gray + (data[i] - gray) * (props.saturation / 100));
      data[i + 1] = Math.min(255, gray + (data[i + 1] - gray) * (props.saturation / 100));
      data[i + 2] = Math.min(255, gray + (data[i + 2] - gray) * (props.saturation / 100));
      const glassOpacity = Math.min(255, a * (0.6 + intensity * 0.4));
      data[i + 3] = glassOpacity;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  ctx.filter = `blur(${glassParams.blur * 0.3}px) saturate(${glassParams.saturation}%) brightness(${glassParams.brightness}) contrast(${glassParams.contrast})`;
  ctx.globalAlpha = 0.95;
  ctx.drawImage(canvas, 0, 0);
  ctx.filter = 'none';
  ctx.globalAlpha = 1;

  isLoaded.value = true;
};

const animate = () => {
  if (props.animated && props.liquid) {
    drawGlassText();
    animationRef.value = requestAnimationFrame(animate);
  }
};

const componentClasses = computed(() => [
  'gh-typography',
  `gh-typography-${props.variant}`,
  `gh-typography-${props.size}`,
  `gh-typography-${props.weight}`,
  `gh-glass-${props.glass}`,
  props.liquid ? 'gh-liquid-flow' : '',
  props.gradient ? 'gh-gradient' : '',
  props.animated ? 'gh-animated' : '',
  props.glow ? 'gh-glow' : '',
  isLoaded.value ? 'gh-loaded' : '',
  props.className,
].filter(Boolean).join(' '));

const containerStyle = computed(() => ({
  ...props.style,
  fontFamily: props.fontFamily,
  letterSpacing: `${props.letterSpacing}px`,
  lineHeight: props.lineHeight,
  textAlign: props.textAlign,
  position: 'relative',
  display: 'inline-block',
  minHeight: Math.max(getFontSize() * props.lineHeight, getFontSize() + 30),
  padding: '15px 0',
}));

const canvasStyle = computed(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 1,
}));

const fallbackStyle = computed(() => ({
  opacity: isLoaded.value ? 0 : 1,
  position: 'relative',
  zIndex: 2,
  fontFamily: props.fontFamily,
  fontSize: `${getFontSize()}px`,
  fontWeight: getFontWeight(),
  letterSpacing: `${props.letterSpacing}px`,
  lineHeight: props.lineHeight,
  textAlign: props.textAlign,
  color: 'transparent',
}));

const updateDimensions = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    dimensions.value = { width: rect.width, height: rect.height };
  }
};

onMounted(() => {
  updateDimensions();
  window.addEventListener('resize', updateDimensions);
  nextTick(() => {
    if (dimensions.value.width > 0 && dimensions.value.height > 0) {
      drawGlassText();
    }
  });
});

watch(dimensions, () => {
  if (dimensions.value.width > 0 && dimensions.value.height > 0) {
    drawGlassText();
  }
});

watch([() => props.animated, () => props.liquid], () => {
  if (props.animated && props.liquid) {
    animate();
  } else {
    if (animationRef.value) {
      cancelAnimationFrame(animationRef.value);
    }
  }
});

onUnmounted(() => {
  if (animationRef.value) {
    cancelAnimationFrame(animationRef.value);
  }
  window.removeEventListener('resize', updateDimensions);
});
</script>