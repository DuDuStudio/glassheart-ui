<template>
  <div
    :class="containerClasses"
    :style="containerStyle"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'outline', 'solid', 'transparent'].includes(value)
  },
  glass: {
    type: String,
    default: 'medium',
    validator: (value) => ['light', 'medium', 'heavy'].includes(value)
  },
  interactive: {
    type: Boolean,
    default: false
  },
  liquid: {
    type: Boolean,
    default: false
  },
  animated: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)
  },
  margin: {
    type: String,
    default: 'none',
    validator: (value) => ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)
  },
  rounded: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  shadow: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  overflow: {
    type: String,
    default: 'visible',
    validator: (value) => ['visible', 'hidden', 'scroll', 'auto'].includes(value)
  },
  position: {
    type: String,
    default: 'static',
    validator: (value) => ['static', 'relative', 'absolute', 'fixed', 'sticky'].includes(value)
  },
  zIndex: {
    type: Number,
    default: undefined
  },
  className: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['click', 'mouseenter', 'mouseleave']);

const containerClasses = computed(() => {
  const baseClasses = 'gh-container';
  const sizeClasses = `gh-container-${props.size}`;
  const variantClasses = props.variant !== 'default' ? `gh-container-${props.variant}` : '';
  const glassClasses = `gh-glass-${props.glass}`;
  const interactiveClasses = props.interactive ? 'gh-container-interactive' : '';
  const liquidClasses = props.liquid ? 'gh-container-liquid' : '';
  const animatedClasses = props.animated ? 'gh-container-animated' : '';
  const paddingClasses = props.padding !== 'none' ? `gh-p-${props.padding}` : '';
  const marginClasses = props.margin !== 'none' ? `gh-m-${props.margin}` : '';
  const roundedClasses = props.rounded !== 'none' ? `gh-rounded-${props.rounded}` : '';
  const shadowClasses = props.shadow !== 'none' ? `gh-shadow-${props.shadow}` : '';
  const overflowClasses = props.overflow !== 'visible' ? `gh-overflow-${props.overflow}` : '';
  const positionClasses = props.position !== 'static' ? `gh-position-${props.position}` : '';

  return [
    baseClasses,
    sizeClasses,
    variantClasses,
    glassClasses,
    interactiveClasses,
    liquidClasses,
    animatedClasses,
    paddingClasses,
    marginClasses,
    roundedClasses,
    shadowClasses,
    overflowClasses,
    positionClasses,
    props.className,
  ]
    .filter(Boolean)
    .join(' ');
});

const containerStyle = computed(() => {
  const style = {};
  if (props.zIndex !== undefined) {
    style.zIndex = props.zIndex;
  }
  return style;
});

const handleClick = () => {
  emit('click');
};

const handleMouseEnter = () => {
  emit('mouseenter');
};

const handleMouseLeave = () => {
  emit('mouseleave');
};
</script>